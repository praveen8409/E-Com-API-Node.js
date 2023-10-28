import UserModel from "./user.model.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import UserRepository from "./user.repository.js";
import bycrpt from 'bcrypt'
import { ApplicationsError } from "../../error-handler/applicationError.js";

export default class UserController {

  constructor() {
    this.userRepository = new UserRepository();
  }

  async resetPassword(req, res, next) {
    const { newPassword } = req.body;
    const hashedPassword = await bycrpt.hash(newPassword, 12)
    const userID = req.userID;
    try {
      await this.userRepository.resetPassword(userID, hashedPassword)
      res.status(200).send("Password is updated");
    } catch (err) {
      console.log(err);
      console.log("Passing error to middleware");
      next(err);
    }
  }


  async signUp(req, res, next) {
    const {
      name,
      email,
      password,
      type,
    } = req.body;
    try {

      // const hashedPassword = await bcrypt.hash(password, 12)
      const user = new UserModel(
        name,
        email,
        password,
        type
      );
      await this.userRepository.signUp(user);
      res.status(201).send(user);
    } catch (err) {
      next(err);
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
      throw new ApplicationsError("Something went wrong", 500);
    }
  }


}