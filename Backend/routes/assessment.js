const express = require("express")
const { createAssessment, findAssessments, getAssessmentHistory } = require("../controllers/assessment")
const Authorization = require("../middlewares/auth")
const router = express.Router()

router.post('/createAssessment', createAssessment)
router.get('/getAssessments', findAssessments)
router.get('/history/:patientId', getAssessmentHistory)


module.exports = router