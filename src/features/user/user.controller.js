import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';
import UserRepository from "./user.repository.js";

export default class UserController {

  constructor(){
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;
      const user =new UserModel(name, email, password, type);
      await this.userRepository.signUp(user);
      return res.status(200).send(user);
    } catch (error) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  signIn(req, res) {
    const { email, password } = req.body;
    const user = UserModel.signIn(email, password);

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