// 1. Import express.
import  Express from "express";
import UserController from "./user.controller.js";
import jwtAuth from '../../middlewares/jwt.middleware.js';

// 2. Initialize Express router.
const userRouter = Express.Router();

const userController = new UserController();

// All the paths to controller methods.
userRouter.post('/signUp',(req,res, next)=>{
    userController.signUp(req,res, next)
} );
userRouter.post('/signIn', (req,res)=>{
    userController.signIn(req,res)
} );

userRouter.put('/resetPassword', jwtAuth, (req, res, next)=>{
    userController.resetPassword(req, res, next)
});


export default userRouter;
