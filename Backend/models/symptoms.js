const mongoose = require("mongoose")

const symptomsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },

    id: {
        type: String,
        required: true,
        unique: true
    },

    question: {
        type: String,
        required: true
    }
  
},{timestamp: true})


const Symptoms = mongoose.model('Symptoms', symptomsSchema)
module.exports = Symptoms