import { ObjectId } from 'mongodb';
import { getDB } from '../../config/mongodb.js';

export default class CartRepository{
    constructor(){
        this.collection = "cartItems";
    }


    async add(productID, userID, quantity){
        try{
        const db = getDB();
        const collection = db.collection(this.collection);
        await collection.insertOne({productID: new ObjectId(productID), userID: new ObjectId(userID), quantity}) 
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async get(userID){
        try{
        const db = getDB();
        const collection = db.collection(this.collection);
        return await collection.find({userID: new ObjectId(userID)}).toArray();
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
}