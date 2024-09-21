const mongoose = require('mongoose');

const jobListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Freelance'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  salaryRange: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const JobListing = mongoose.model('JobListing', jobListingSchema);

module.exports = JobListing;
