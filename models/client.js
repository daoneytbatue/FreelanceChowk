const mongoose = require('mongoose');

// mongoose.connect("mongodb://127.0.0.1:27017/FreelanceChowk");

const clientSchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
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

module.exports = mongoose.model('Client', clientSchema);