import { MongoClient } from "mongodb";

const url = "mongodb://0.0.0.0/ecomdb";

const connectToMongoDB = ()=>{
    MongoClient.connect(url)
    .then(client=>{
        console.log("MongoDB is connected");
    })
    .catch(err=>{
        console.log(err);
    })
}

export default connectToMongoDB;