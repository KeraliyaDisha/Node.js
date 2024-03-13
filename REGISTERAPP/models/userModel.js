
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        minlength: 5,
        max_length:50,
    },
    email: {
        type: String,
        required:true,
        minlength:5,
        max_length:200,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        max_length:100
    },
    role: {
        type: String,
        required: true,
    }
});

// exports
module.exports = mongoose.model("User", userSchema);