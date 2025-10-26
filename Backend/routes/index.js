const authRoute = require('./auth')
const symptomsRoute = require('./symptoms')
const assessmentRoute = require('./assessment')

const routes = [
   authRoute,
   symptomsRoute,
   assessmentRoute
]

module.exports = routes