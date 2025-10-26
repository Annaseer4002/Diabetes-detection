const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },

    gender: {
        type: String,
        enum: ['male','female'],
        required: true
    },

    dateOfBirth: {
        type: Date,
        required: true
    },

    password: {
        type: String,
        require: true
    }


},{timestamp: true})


const Auth = mongoose.model('Auth', authSchema)
module.exports = Auth