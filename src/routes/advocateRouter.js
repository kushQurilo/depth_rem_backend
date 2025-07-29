const { addAdvocate, updateTiming, deleteTiming } = require("../controllers/admin/advocateController");
const { AuthMiddleWare } = require("../middlewares/adminMiddleware");
const { roleAuthenticaton } = require("../middlewares/roleBaseAuthentication");

const advocateRouter = require("express").Router();
advocateRouter.post('/add-timing',AuthMiddleWare,roleAuthenticaton('admin') , addAdvocate);
advocateRouter.put('/update-timing',AuthMiddleWare,roleAuthenticaton('admin') , updateTiming);
advocateRouter.delete('/delete-timing',AuthMiddleWare,roleAuthenticaton('admin') , deleteTiming);
module.exports = advocateRouter;