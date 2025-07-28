const { userController, createUser, updateUser, sendOTP, verifyOTP } = require('../controllers/userControll');

const userRouter = require('express').Router();
userRouter.get('/',userController);
userRouter.post('/',createUser);
userRouter.get('/login',sendOTP);
userRouter.put('/',updateUser);
userRouter.post('/verify-otp',verifyOTP);
module.exports = userRouter;