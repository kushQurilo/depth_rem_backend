const express = require('express');
const cors = require('cors');
const userRouter = require('./src/routes/userRouter');
const path = require('path');
const bannerRouter = require('./src/routes/bannerRoute');
const loanRouter = require('./src/routes/loansRoute');
const adminRouter = require('./src/routes/adminRoute');
const subscriptionRouter = require('./src/routes/subscriptionRoute');
const serviceRouter = require('./src/routes/serviceRoute');
const advocateRouter = require('./src/routes/advocateRouter');
const DRIRoutes = require('./src/routes/DriRoutes');
const KycRouters = require('./src/routes/KycRouter');
const EmiSettlementRoute = require('./src/routes/EmiSettlementRoute');
const driRoute = require('./src/routes/DriUser');
const UploadSingleImage = require('./src/middlewares/singleImageUpload');
const cloudinary = require('./src/utilitis/cloudinary');4
const fs = require('fs');
const InvoiceRouter = require('./src/routes/invoiceRoute');
const TncRoutetr = require('./src/routes/TncRouter');
const app = express();
const baseURI = '/api/v1/'
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())
app.use('banner',express.static(path.resolve('public/uploads/banner')));
app.use(`${baseURI}admin`,adminRouter);
app.use(`${baseURI}user`,userRouter);
app.use(`${baseURI}banner`, bannerRouter);
app.use(`${baseURI}loan`,loanRouter);
app.use(`${baseURI}subcription`,subscriptionRouter);
app.use(`${baseURI}service`,serviceRouter);
app.use(`${baseURI}advocate`,advocateRouter);
app.use(`${baseURI}driworks`,DRIRoutes);
app.use(`${baseURI}kyc`,KycRouters);
app.use(`${baseURI}emi`,EmiSettlementRoute );
app.use(`${baseURI}driuser`,driRoute);
app.use(`${baseURI}invoice`,InvoiceRouter);
app.use(`${baseURI}tnc`,TncRoutetr);
module.exports = app;
