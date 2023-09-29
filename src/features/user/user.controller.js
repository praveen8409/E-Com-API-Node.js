import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';

export default class UserController{
    signUp(req, res){
        const{name, email, password, type} = req.body;
        const user = UserModel.signUp(name,email,password,type);
        return res.status(200).send(user);
    }

    signIn(req, res){
        const {email, password} = req.body;
      const user =  UserModel.signIn(email, password);

      if (!user) {
        console.log(user);
        return res.status(400).send('Incorrect Credentials');
      } else {

         // 1. Create token.
      const token = jwt.sign(
        {
          userID: user.id,
          email: user.email,
        },
        "rhms0xmeon7JGcmKUw2Sv2bqn84saLa4",
        {
          expiresIn: '1h',
        }
      );

      // 2. Send token.
      return res.status(200).send(token);
        // return res.send('Login Successful');
      }
    }

    
}