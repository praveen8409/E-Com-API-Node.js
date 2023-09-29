import express from 'express';
import CartController  from './cart.controller.js';

const cartRouter = express.Router();

const cartController = new CartController();

cartRouter.post('/',cartController.add);
cartRouter.get('/',cartController.get);

export default cartRouter;