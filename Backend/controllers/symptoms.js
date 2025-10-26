const Symptoms = require("../models/symptoms")

const symptom = async (req, res) => {
    const { userId, id, question } = req.body

    if(!userId || !id || !question ){
        return res.status(400).json({
            success: false,
            message: 'All fields required'
        })
    }

    if(userId.role !== 'admin'){
        return res.status(403).json({
            success: false,
            message: 'Forbidden'
        })
    }

    const existingSymptom = await Symptoms.findOne({id})
    if(existingSymptom){
         return res.status(400).json({
            success: false,
            message: 'Symptom already exist'
        })
    }

    const symptom = new Symptoms({
        userId, id, question
    })

    await symptom.save()

    res.status(201).json({
        success: true,
        message: 'Symptom added successfully',
        data: symptom
    })
}



const updateSymptom = async (req, res) => {
    try {
           const { id } = req.params

           const updateSymptom = await findByIdAndUpdate(id,{
            $set: req.body}, {new:true
           })

           if(!updateSymptom){
              return res.status(404).json({
                success: false,
                message: 'Symptom not found'
              })
           }

           res.status(200).json({
             success: true,
             message: 'successfully updated symptom',
             data: updateSymptom
           })


        
    } catch (error) {
        res.status(500).json({
            success: failed,
            message: error.message
        })
    }
}


const symptomController = {
    symptom,
    updateSymptom
}

module.exports = symptomController