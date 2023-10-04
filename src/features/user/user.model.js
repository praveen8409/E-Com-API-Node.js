import { getDB } from "../../config/mongodb.js";
export default class UserModel {
    constructor(name, email, password, type, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this._id = id;
    }

    

    

    static getAll() {
        return users;
    }
}

var users = [
    {
        "id": 1,
        "name": "Seller user",
        "email": "admin@gmail.com",
        "password": "admin",
        "type": "seller"
    },

    {
        "id": 2,
        "name": "Customer user",
        "email": "customer@gmail.com",
        "password": "customer",
        "type": "Customer"
    }
]