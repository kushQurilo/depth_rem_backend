const { EMISettlement, deleteEmis } = require('../controllers/EMISettlementController');
const { AuthMiddleWare } = require('../middlewares/adminMiddleware');
const { roleAuthenticaton } = require('../middlewares/roleBaseAuthentication');

const EmiSettlementRoute = require('express').Router();

EmiSettlementRoute.post('/create-emi',AuthMiddleWare ,roleAuthenticaton('admin'),EMISettlement);
EmiSettlementRoute.delete('/delete-emi',AuthMiddleWare ,roleAuthenticaton('admin'),deleteEmis);


module.exports = EmiSettlementRoute