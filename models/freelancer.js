const mongoose = require('mongoose');

// mongoose.connect("mongodb://127.0.0.1:27017/FreelanceChowk");

const freelancerSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNo: String,
    skills: [String],
    ExpDescription: String,
    portfolio: String,   
    ProjectPre : String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
});

module.exports = mongoose.model('freelancer', freelancerSchema);