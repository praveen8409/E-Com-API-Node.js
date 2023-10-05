import ProductModel from "../product/product.model.js";
import  CartModel  from "./cart.model.js";
import CartRepository from "./cart.repository.js";

export default class CartController {
    constructor(){
        this.cartRepository = new CartRepository();
    }
   async add(req, res) {
    try{
        const { productID, quantity } = req.body;
            const userID = req.userID;
            await this.cartRepository.add(productID, userID, quantity);
            res.status(201).send("Cart is updated");
    }catch(err){
        console.log(err);
        return res.status(200).send("Something went wrong");
       }    
    }

    get(req, res){
        const userID = req.userID;
        const items = CartModel.get(userID);
        // if(!items){
        //     return res.send("Cart is empty");
        // }
        console.log(items)
        return res.status(200).send(items);

    }

    delete(req, res){
        const userID = req.userID;
        const cartItemID = req.params.id;

       const err = CartModel.delete(cartItemID, userID);
       if(err){
        return res.status(404).send(err);
       }

       return res.status(200).send("Item deleted from Cart");
    }
}