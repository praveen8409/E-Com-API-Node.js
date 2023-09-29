import ProductModel from "../product/product.model.js";
import  CartModel  from "./cart.model.js";

export default class CartController {
    add(req, res) {
        const { productID, quantity } = req.query;
        const userID = req.userID;
        if(!ProductModel.getById(productID)){
            return res.status(400).send("Product is not Exists");
        }
        CartModel.add(userID, productID,  quantity);
        res.status(201).send("Cart is updated");
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