const express = require('express')
const { signup, login, user } = require('../controllers/auth')
const { authenticate } = require('../middlewares/auth')
const router = express.Router()

router.post('/signUp', signup)
router.post('/login', login)
router.get('/user', user)

module.exports = router