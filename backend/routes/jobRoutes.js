const express = require('express');
const Joi = require('joi');
const { getJobs, applyForJob, createJob, fetchJob } = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Define Joi schemas
const jobSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  salaryRange: Joi.string().required(),
});

const applyJobSchema = Joi.object({
  jobId: Joi.string().required(),
  userId: Joi.string().required(),
});

// Route to get all jobs
router.get('/', getJobs);

// Route to get a job by ID
router.get('/getJobById/:id', fetchJob);

// Routes for applying and creating jobs
router.post('/jobseeker/apply', async (req, res, next) => {
  const { error } = applyJobSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await applyForJob(req, res);
  } catch (err) {
    next(err);
  }
});

router.post('/employeeseeker/create', authMiddleware, async (req, res, next) => {
  const { error } = jobSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await createJob(req, res);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
