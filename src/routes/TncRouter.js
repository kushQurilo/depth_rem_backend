const TncRoutetr = require('express').Router();
const { addTNC, updateTnc, deleteTnc } = require('../controllers/termsAndConditionController');
TncRoutetr.post('/add',addTNC);
TncRoutetr.put('/update',updateTnc);
TncRoutetr.delete('/delete',deleteTnc);

module.exports = TncRoutetr