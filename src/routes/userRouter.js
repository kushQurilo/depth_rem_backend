const { userController, createUser, updateUser, sendOTP, verifyOTP } = require('../controllers/userControll');
const limiter = require('../middlewares/rateLimitMiddleware');

const userRouter = require('express').Router();
userRouter.get('/',userController);
userRouter.post('/',createUser);
userRouter.get('/login',limiter,sendOTP);
userRouter.put('/',updateUser);
userRouter.post('/verify-otp',verifyOTP);
module.exports = userRouter;