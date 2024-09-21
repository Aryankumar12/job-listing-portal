// controllers/jobController.js
const Job = require('../models/Job');
const Application = require('../models/Application'); // Ensure this is defined

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


const applyForJob = async (req, res) => {
  const { jobId, userId } = req.body; // Ensure this matches your request structure

  try {
    // Check for required fields
    if (!jobId || !userId) {
      return res.status(400).json({ message: 'Job ID and User ID are required' });
    }

    // Example: Save application to database (update this according to your schema)
    const application = new Application({
      jobId,
      userId,
      appliedAt: new Date(),
    });

    await application.save();

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




const fetchJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

const createJob = async (req, res) => {
  const { title, company, type, location, description, salaryRange, requirements } = req.body;

  // Check if any required fields are missing
  if (!title || !company || !type || !location || !description || !salaryRange || !requirements) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newJob = new Job({ title, company, type, location, description, salaryRange, requirements });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create job' });
  }
};


module.exports = {
  getJobs,
  applyForJob,
  createJob,
  fetchJob,
};
