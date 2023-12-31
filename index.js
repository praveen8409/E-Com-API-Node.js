import "./env.js"
// 1. import Express
import  express from 'express';
import swagger from 'swagger-ui-express';
import cors from 'cors';
import mongoose from "mongoose";



import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import orderRouter from "./src/features/order/order.routes.js";
import bodyParser from 'body-parser';
import apiDocs from './swagger(3.0.0).json' assert {type: 'json'};
// import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cart/cart.routes.js';
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import { ApplicationsError } from './src/error-handler/applicationError.js';
import {connectToMongoDB} from './src/config/mongodb.js';
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";

// 2. Create server
const server = express();



// CORS policy configuration
// server.use((req, res, next)=>{
//     res.header('Access-Control-Allow-Origin','http://localhost:5500');
//     res.header('Access-Control-Allow-Headers','*');
//     res.header('Access-Control-Allow-Methods','*');
//     // return ok for preflight request.
//     if(req.method=="OPTIONS"){
//       return res.sendStatus(200);
//     }
//     next();
//   });

server.use(cors());

server.use(bodyParser.json());

server.use("/api-docs", 
swagger.serve, 
swagger.setup(apiDocs));

server.use(loggerMiddleware);

// For all request releted to Product, redirect to Product routes
server.use('/api/products',jwtAuth, productRouter);
// For all request releted to User, redirect to Product routes
server.use('/api/users',userRouter);
// For all request releted to Cart, redirect to Cart routes
server.use('/api/cart',jwtAuth,cartRouter);

// For all request releted to Order, redirect to Order routes
server.use('/api/orders',jwtAuth,orderRouter);


// 3. Create default handller

server.get('/',(req, res)=>{
    res.send('Welcome Ecommerce API');
});

// Error Handler Middleware
server.use((err, req, res, next) => {
    console.log(err);
    if(err instanceof mongoose.Error.ValidationError){
      return res.status(400).send(err.message);
    }
    if(err instanceof ApplicationsError){
        res.status(err.code).send(err.message);
    }
  
    // server errors.
    res
      .status(500)
      .send(
        'Something went wrong, please try later'
      );
  });

// 4. Middleware to handle 404 request
server.use((req, res)=>{
    res.status(404).send("API not found. Please check our documantation for more information at localhost:3200/api-docs");
});

server.listen(3200,()=>{
    console.log("Server is runnong on port 3200");
    // connectToMongoDB();
    connectUsingMongoose();
});