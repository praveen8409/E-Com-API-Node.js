// 1. Import express.
import  Express from "express";
import UserController from "./user.controller.js";

// 2. Initialize Express router.
const userRouter = Express.Router();

const userController = new UserController();

// All the paths to controller methods.
userRouter.post('/signUp', userController.signUp);
userRouter.post('/signIn', userController.signIn);

export default userRouter;
