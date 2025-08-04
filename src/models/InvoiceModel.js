const mongoose = require('mongoose');
const InvoiceSchema = new mongoose.Schema({
    date:{
        type:Date
    },
    paymentAmount:{
        type:String
    },
    amount:{
        type:String
    }
}, { strict: false });

const InvoiceModel = mongoose.model('Invoice', InvoiceSchema);
module.exports = InvoiceModel;


