import { MongoClient } from "mongodb";

const url = "mongodb://0.0.0.0/ecomdb";

let client;
export const connectToMongoDB = ()=>{
    MongoClient.connect(url)
    .then(clientInstance=>{
        client = clientInstance;
        console.log("MongoDB is connected");
    })
    .catch(err=>{
        console.log(err);
    })
}

export const getDB =()=>{
    return client.db();
};