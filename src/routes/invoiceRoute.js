const { uploadInvoice, viewInvoice, testingInvoice, getInvoices } = require('../controllers/invoce/insertInvoiceController');
const { AuthMiddleWare } = require('../middlewares/adminMiddleware');
const { roleAuthenticaton } = require('../middlewares/roleBaseAuthentication');
const UploadSingleImage = require('../middlewares/singleImageUpload')

const InvoiceRouter = require('express').Router()
InvoiceRouter.post('/:user_id',AuthMiddleWare,roleAuthenticaton('admin') ,UploadSingleImage.single('pdf'),uploadInvoice);
InvoiceRouter.get('/get-invoice/:user_id',getInvoices);
InvoiceRouter.get('/',viewInvoice);

module.exports = InvoiceRouter;