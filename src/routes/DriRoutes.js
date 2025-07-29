const { createDRI, updateDri, DeleteDri } = require('../controllers/admin/DriContorller');
const { AuthMiddleWare } = require('../middlewares/adminMiddleware');
const { roleAuthenticaton } = require('../middlewares/roleBaseAuthentication');
const DRIRoutes = require('express').Router();
DRIRoutes.post('/add-dri-works',AuthMiddleWare,roleAuthenticaton('admin'),createDRI);
DRIRoutes.put('/update-dri-works',AuthMiddleWare ,roleAuthenticaton('admin'),updateDri);
DRIRoutes.delete('/delete-dri-works',AuthMiddleWare ,roleAuthenticaton('admin'),DeleteDri);
module.exports = DRIRoutes;