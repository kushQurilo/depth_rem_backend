const { createAdmin, loginAdmin, addBarcodeWithUpi, updateAdminDetails, getAdminDetails, getBarcodeAndUpi } = require('../controllers/admin/adminControll');
const { AuthMiddleWare } = require('../middlewares/adminMiddleware');
const upload = require('../middlewares/bannerMiddleware');
const limiter = require('../middlewares/rateLimitMiddleware');
const { roleAuthenticaton } = require('../middlewares/roleBaseAuthentication');

const adminRouter = require('express').Router();
adminRouter.post('/',createAdmin);
adminRouter.get('/',limiter,loginAdmin);
adminRouter.put('/',upload.single('barcode'),AuthMiddleWare,roleAuthenticaton('admin'),addBarcodeWithUpi);
adminRouter.put('/update-details',AuthMiddleWare,roleAuthenticaton('admin'),updateAdminDetails)
adminRouter.get('/get-details',AuthMiddleWare,roleAuthenticaton('admin'),getAdminDetails);
adminRouter.get('/barcode-details',AuthMiddleWare,roleAuthenticaton('admin',"user"),getBarcodeAndUpi);
module.exports = adminRouter;