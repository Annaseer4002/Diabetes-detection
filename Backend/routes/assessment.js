const express = require("express")
const { createAssessment, findAssessments } = require("../controllers/assessment")
const Authorization = require("../middlewares/auth")
const router = express.Router()

router.post('/createAssessment', createAssessment)
router.get('/getAssessments', findAssessments)


module.exports = router