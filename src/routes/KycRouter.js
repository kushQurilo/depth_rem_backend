const { CompleteKYC, ApproveByAdmin } = require('../controllers/KYCController');
const { AuthMiddleWare } = require('../middlewares/adminMiddleware');
const { roleAuthenticaton } = require('../middlewares/roleBaseAuthentication');
const { UserAuthMiddleWare } = require('../middlewares/userMiddleware');

const KycRouters = require('express').Router();

KycRouters.post('/add-kyc',UserAuthMiddleWare,roleAuthenticaton('user'),CompleteKYC);
KycRouters.post('/approve-kyc',AuthMiddleWare,roleAuthenticaton('admin'),ApproveByAdmin);
module.exports = KycRouters