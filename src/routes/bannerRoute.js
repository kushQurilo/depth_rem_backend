const { createBanner, getBanner, bannerWithTitle, getBannerWithTitle } = require('../controllers/bannerControll');
const upload = require('../middlewares/bannerMiddleware');

const bannerRouter = require('express').Router();
bannerRouter.post('/upload',upload.single('bannerImage'),createBanner);
bannerRouter.get('/',getBanner);
bannerRouter.post('/bannertext',upload.single("bannerImage"),bannerWithTitle);
bannerRouter.get('/all',getBannerWithTitle);
module.exports = bannerRouter;