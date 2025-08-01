const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');
const InvoiceModel = require('../models/Invoice'); 

exports.uploadInvoice = async (req, res, next) => {
    try {
        const invoiceData = [];

        const result = await csv().fromFile(req.file.path);

        result.forEach(row => {
            const serviceName = row.service || row.settlement || row.product || 'Unknown Service';
            const invoice = {
                invoiceNumber: row?.invoiceid || `INV-${Math.floor(1000 + Math.random() * 9000)}`,
                invoiceDate: row?.invoicedate || new Date().toISOString().split('T')[0],
                customer:{
                    name: row?.customer || 'Unknown',
                    email: row?.email || 'unknown@example.com',
                    address: row?.address || 'N/A',
                },
                items: [
                    {
                        name: serviceName,
                        quantity: Number(row?.quantity || 1),
                        price: Number(row?.amount || row?.total || 0),
                    }
                ],
            };
            invoiceData.push(invoice);
        });
        const inserted = await InvoiceModel.insertMany(invoiceData);

        res.status(200).json({ message: 'Invoices uploaded', data: inserted });
        fs.unlinkSync(req.file.path);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
