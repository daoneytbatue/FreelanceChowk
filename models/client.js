const mongoose = require('mongoose');

// mongoose.connect("mongodb://127.0.0.1:27017/FreelanceChowk");

const clientSchema = mongoose.Schema({
   user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    firstName: String,
    lastName: String,
    phoneNo: String,
    position: String,            // Position at the company, e.g., Hiring Manager
    domain: String,            // Employer's industry type
    jobTitle: String,            // The job title for the project or task
    jobDescription: String,      // Detailed description of the project or job
    requiredSkills: [String],    // Array of required skills for the job
    experienceLevel: String,     // Desired experience level of freelancers (e.g., Beginner, Intermediate, Expert)
    budget: Number,              // Budget allocated for the project
    timeline: String,            // Project timeline or duration
    ProjectPre: String,   // Preference for the type of project (Remote, On-site, etc.)
    
});

module.exports = mongoose.model('Client', clientSchema);
