const mongoose = require("mongoose")


const assessmentSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true
    },

    symptoms: [{
        
            type: String,
            
            required: true
    }],

    riskLevel: {
        type: String,
        required: true,
        enum: ['Type 1 Diabetes','Type 2 Diabetes','Gestational Diabetes']
    },

    treatments: [{
        type: String,
        required: true,

    }]
        
    
},{timestamp: true})


const Assessment =  mongoose.model('Assesssment', assessmentSchema)

module.exports = Assessment