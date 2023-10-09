import { MongoClient } from "mongodb";

const url = process.env.DB_URL;

let client;
export const connectToMongoDB = ()=>{
    MongoClient.connect(url)
    .then(clientInstance=>{
        client = clientInstance;
        createCounter(client.db());
        console.log("MongoDB is connected");
    })
    .catch(err=>{
        console.log(err);
    })
}

export const getDB =()=>{
    return client.db();
};

const createCounter = async(db)=>{
    const existingCounter=await db.collection("counters").findOne({_id:'cartItemId'});
    if(!existingCounter){
        await db.collection("counters").insertOne({_id:'cartItemId', value:0});
    }
}