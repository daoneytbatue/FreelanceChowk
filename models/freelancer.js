const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/freelancer");

const freelancerSchema = mongoose.Schema({
    username : String,
    skills :String, 
    
    bio: String,
    
    charge:Number,
    
    experience: Number,
    
    rating : { 
        type: Number, 
        default: 0 
    },
    
    reviews: { 
        client: String, 
        feedback: String 
    },
    
    portfolio: [String],
})

module.exports = mongoose.model('freelancer', freelancerSchema);