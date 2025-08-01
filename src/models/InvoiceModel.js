const mongoose = require('mongoose');
const InvoiceSchema = new mongoose.Schema({}, { strict: false });

const InvoiceModel = mongoose.model('Invoice', InvoiceSchema);
module.exports = InvoiceModel;


