// 1. Import Express
import express from 'express';
import ProductController from './product.controller.js';
import {upload} from '../../middlewares/fileupload.middleware.js';
// 2. Intilize Express routers
const productRouter = express.Router();

const productController = new ProductController();

// All the path to controller method

// localhost:4100/api/products/filter?minPrice=10&maxPrice=20&category=Category1
productRouter.get('/filter',productController.filterProducts);
productRouter.get('/',productController.getAllProducts);
productRouter.post('/',upload.single('imageUrl'),productController.addProduct);
productRouter.get('/:id',productController.getOneProduct);
productRouter.post('/rateProduct',productController.rateProduct);



export default productRouter;