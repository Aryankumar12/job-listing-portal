const express = require('express');
const { getNotifications, markAsRead } = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Fetch notifications for the logged-in user
router.get('/', authMiddleware, getNotifications);

// Mark notifications as read
router.post('/read', authMiddleware, markAsRead);

module.exports = router;
