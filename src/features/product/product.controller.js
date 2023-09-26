import ProductModel from "./product.model.js";
export default class ProductController{

    getAllProducts(req, res){
        const products = ProductModel.GetAll();
        res.status(200).send(products);
    }

    addProduct(req, res){
        console.log(req.body);

        res.status(200).send("Product added successfully");
        
    }

    rateProduct(req, res){

    }

    getOneProduct(req, res){
        
    }
}