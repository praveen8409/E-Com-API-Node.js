// 1. Import Express
import express from 'express';
import ProductController from './product.controller.js';

// 2. Intilize Express routers
const productRouter = express.Router();

const productController = new ProductController();

// All the path to controller method
productRouter.get('/',productController.getAllProducts);
productRouter.post('/',productController.addProduct);



export default productRouter;