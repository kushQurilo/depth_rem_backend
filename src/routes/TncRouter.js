const TncRoutetr = require('express').Router();
const { addTNC } = require('../controllers/termsAndConditionController');
TncRoutetr.post('/add',addTNC);

module.exports = TncRoutetr