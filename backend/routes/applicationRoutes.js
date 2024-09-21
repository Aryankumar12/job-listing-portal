const express = require('express');
const { getApplications, submitApplication, updateApplicationStatus } = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Job seekers view their applications
router.get('/', authMiddleware, roleMiddleware(['jobseeker']), getApplications);

// Job seekers apply for a job
router.post('/apply', authMiddleware, roleMiddleware(['jobseeker']), submitApplication);

// Employers update the status of applications
router.put('/:id/status', authMiddleware, roleMiddleware(['employeeseeker']), updateApplicationStatus);

module.exports = router;
