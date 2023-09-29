

let id = 0;
export default class CartModel{
    constructor(userID, productID, quantity){
        this.userID = userID;
        this.productID = productID;
        this.quantity = Number(quantity);
        this.id = ++id;
    }
static add(userID, productID, quantity){
    const cartItem = new CartModel(userID, productID, quantity);
    // cartItem.id = cartItems.lengh + 1;
    // cartItems.push(cartItem);
    // return cartItem;


    let newItemFlag = true;
    for(let i = 0; i < cartItems.length; i++){
        if(cartItems[i].userID == userID && cartItems[i].productID == productID){
            cartItems[i].quantity += Number(quantity);
            newItemFlag = false;
            console.log(cartItems)
        }
    }

    if(newItemFlag){
        
        cartItems.push(cartItem);
        return cartItem;
    }

    return cartItem;
}

static get(userID){

    // if(cartItems.length == 0){
    //     return "Cart is Empty"
    // }
    let count = 0;
        for(let i = 0; i < cartItems.length; i++){
           if( cartItems[i].userID == userID){
                count++;
           }
        }
       
    const cart = cartItems.filter((i)=> i.userID == userID);
    if(count == 0 && cart != null){
        return "No item added in cart";
    }
    return cart;
}

    static delete(cartItemID, userID){
        const cartItemIndex = cartItems.findIndex(
            (i)=> i.id == cartItemID && i.userID == userID
        );

        if(cartItemIndex == -1){
            return "Item not found";
        }else{
            cartItems.splice(cartItemIndex, 1);
        }
    }

} 

var cartItems = [new CartModel(1,2,1)];