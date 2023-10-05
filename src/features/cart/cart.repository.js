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
}