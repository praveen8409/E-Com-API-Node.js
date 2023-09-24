// 1. import Express
import  express from 'express';

// 2. Create server
const server = express();

// 3. Create default handller

server.get('/',(req, res)=>{
    res.send('Welcome Ecommerce API');
});

server.listen(3200,()=>{
    console.log("Server is runnong on port 3200");
});