const { createBanner, getBanner, bannerWithTitle, getBannerWithTitle } = require('../controllers/bannerControll');
const UploadSingleImage = require('../middlewares/singleImageUpload');

const bannerRouter = require('express').Router();

bannerRouter.post('/upload',UploadSingleImage.single("image"),createBanner);
bannerRouter.get('/',getBanner);
bannerRouter.post('/bannertext',UploadSingleImage.single("image"),bannerWithTitle);
bannerRouter.get('/all',getBannerWithTitle);
module.exports = bannerRouter;