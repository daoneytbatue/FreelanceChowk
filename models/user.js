const mongoose = require('mongoose');
const freelancer = require('./freelancer');

mongoose.connect("mongodb://127.0.0.1:27017/FreelanceChowk");

const userSchema = mongoose.Schema({
    username : String,
    email : String,
    password : String,
    isFreelancer : Boolean,
    FL_details : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "freelancer"
    },
    C_details : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "client"
    }
})

module.exports = mongoose.model('user', userSchema);