import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';
import UserRepository from "./user.repository.js";
import bycrpt from 'bcrypt'

export default class UserController {

  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;

      const hashPassword = await bycrpt.hash(password, 12);
      const user = new UserModel(name, email, hashPassword, type);

      await this.userRepository.signUp(user);

      return res.status(200).send(user);

    } catch (error) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async signIn(req, res, next) {
    try {
      //1 Find user by email
      const user = await this.userRepository.findByEmail(req.body.email);
      if (!user) {
        console.log(user);
        return res.status(400).send('Incorrect Credentials');
      } else {
        //2 Compare the palne password with Hash Password
        const result = await bycrpt.compare(req.body.password, user.password);
        if (result) {
          // 3. Create token.
          const token = jwt.sign(
            {
              userID: user._id,
              email: user.email,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '1h',
            }
          );

          // 4. Send token.
          return res.status(200).send(token);
          // 5. return res.send('Login Successful');
        } else {
          return res.status(400).send('Incorrect Credentials');
        }
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }


}