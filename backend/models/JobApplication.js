const mongoose = require('mongoose')

const jobApplicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobListing',
        required: true,
      },
      applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      status: {
        type: String,
        enum: ['applied', 'reviewed', 'rejected'],
        default: 'applied',
      },
      resume: {
        type: String, // URL of the uploaded resume
        required: true,
      },
      coverLetter: {
        type: String,
        required: false,
      },
      appliedAt: {
        type: Date,
        default: Date.now,
      },
})


const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;