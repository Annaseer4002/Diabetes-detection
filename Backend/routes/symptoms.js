const express = require("express")
const symptomController = require("../controllers/symptoms")
const router = express.Router()

router.post('/createSymptom', symptomController.symptom)
router.patch('/updateSymptom', symptomController.updateSymptom)

module.exports = router