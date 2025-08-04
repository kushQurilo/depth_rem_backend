const { uploadInvoice, viewInvoice } = require('../controllers/invoce/insertInvoiceController')
const UploadSingleImage = require('../middlewares/singleImageUpload')

const InvoiceRouter = require('express').Router()
InvoiceRouter.post('/',UploadSingleImage.single('pdf'),uploadInvoice);
InvoiceRouter.get('/',viewInvoice)
module.exports = InvoiceRouter;