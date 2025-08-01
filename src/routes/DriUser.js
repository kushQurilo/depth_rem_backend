const { importUsersFromCSV, getUsersList } = require('../controllers/DriUser')
const csvUpload = require('../middlewares/csvMiddleware')

const driRoute = require('express').Router()
driRoute.post('/',csvUpload.single('csv'),importUsersFromCSV);
driRoute.get('/',getUsersList)

module.exports = driRoute;