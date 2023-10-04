import { getDB } from "../../config/mongodb.js";
export default class UserModel {
    constructor(name, email, password, type, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this._id = id;
    }

    static async signUp(name, email, password, type) {
        try {
            // 1. Get the database
            const db = getDB();
            // 2. Get the collection
            const collection = db.collection("users");

            const newUser = new UserModel(name, email, password, type);
            // 3. Insert the document.
            await collection.insertOne(newUser);
            return newUser;

        } catch (err) {
            throw new ApplicationError("Something went wrong", 500);
        }

    }

    static signIn(email, password) {
        const user = users.find((u) => u.email == email && u.password == password);
        return user;
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