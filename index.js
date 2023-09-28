// 1. import Express
import  express from 'express';
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import bodyParser from 'body-parser';
// import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';

// 2. Create server
const server = express();

server.use(bodyParser.json());
// For all request releted to Product, redirect to Product routes
server.use('/api/products',jwtAuth, productRouter);
// For all request releted to User, redirect to Product routes
server.use('/api/users',userRouter);


// 3. Create default handller

server.get('/',(req, res)=>{
    res.send('Welcome Ecommerce API');
});

server.listen(3200,()=>{
    console.log("Server is runnong on port 3200");
});