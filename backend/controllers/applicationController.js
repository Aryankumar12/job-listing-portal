const JobApplication = require('../models/JobApplication');
const JobListing = require('../models/JobListing');

// Get job applications for a user (job seeker)
const getApplications = async (req, res) => {
    try {
        const userId = req.user.id;
        const applications = await JobApplication.find({ applicant: userId }).populate('job');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Submit a job application (job seeker)
const submitApplication = async (req, res) => {
    try {
        const userId = req.user.id;
        const { jobId } = req.body;
        const newApplication = new JobApplication({
            applicant: userId,
            job: jobId,
            status: 'applied'
        });
        await newApplication.save();
        res.status(201).json(newApplication);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update the status of a job application (employer)
const updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const application = await JobApplication.findById(id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        application.status = status;
        await application.save();
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getApplications,
    submitApplication,
    updateApplicationStatus,
};
