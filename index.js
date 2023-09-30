// 1. import Express
import  express from 'express';
import swagger from 'swagger-ui-express';


import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import bodyParser from 'body-parser';
import apiDocs from './swagger(3.0.0).json' assert {type: 'json'};
// import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cart/cart.routes.js';

// 2. Create server
const server = express();

server.use(bodyParser.json());

server.use("/api-docs", 
swagger.serve, 
swagger.setup(apiDocs))

// For all request releted to Product, redirect to Product routes
server.use('/api/products',jwtAuth, productRouter);
// For all request releted to User, redirect to Product routes
server.use('/api/users',userRouter);
// For all request releted to Cart, redirect to Cart routes
server.use('/api/cart',jwtAuth,cartRouter);


// 3. Create default handller

server.get('/',(req, res)=>{
    res.send('Welcome Ecommerce API');
});

server.listen(3200,()=>{
    console.log("Server is runnong on port 3200");
});