const { createBanner, getBanner, bannerWithTitle, getBannerWithTitle, deleteBanner } = require('../controllers/bannerControll');
const { AuthMiddleWare } = require('../middlewares/adminMiddleware');
const { roleAuthenticaton } = require('../middlewares/roleBaseAuthentication');
const UploadSingleImage = require('../middlewares/singleImageUpload');

const bannerRouter = require('express').Router();

bannerRouter.post('/upload',UploadSingleImage.single("image"),createBanner);
bannerRouter.get('/',getBanner);
bannerRouter.post('/bannertext',UploadSingleImage.single("image"),bannerWithTitle);
bannerRouter.get('/all',getBannerWithTitle);
bannerRouter.delete('/delete-banner',AuthMiddleWare,roleAuthenticaton('admin'),deleteBanner)
module.exports = bannerRouter;