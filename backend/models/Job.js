const mongoose = require('mongoose');

// Define the Job schema
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true, // Full-Time, Part-Time, etc.
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  salaryRange: {
    type: String, // Consider using an array if you want to store min and max separately
    required: true,
  },
  requirements: {
    type: String, // You can also use an array if you want to list multiple requirements
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Job model
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
