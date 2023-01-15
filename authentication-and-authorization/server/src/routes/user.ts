// server/src/routes/user.ts

// global dependencies
const { ENCRYPTION_KEY, AUTH_TOKEN_KEY } = process.env;
import {Router} from 'express';
const userRoute = Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// project dependencies
import {UserResource} from '../repositories/UserRepository';
import { validateHasParameters, validateEmailFormat, validatePasswordLength } from "../middleware/validation";
import userRepository from '../repositories/UserRepository';

/**
 * Register an user with email, password and name inputs
 */
userRoute.post(
  "/register",
  validateHasParameters("email", "password", "name"),
  validateEmailFormat,
  validatePasswordLength,
  async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const userExist = await userRepository.getUserBy({id: email, matchField: 'email'});
      if (userExist) {
        return res.status(409).json({ error: "User already exist" });
      }

      const date = new Date().toISOString();

      // Encrypt user password
      const passwordHash = await bcrypt.hash(password, ENCRYPTION_KEY!);

      // Create auth token with user info and expiry date
      const userData = {
        name: name,
        email: email,
        password: passwordHash,
        createdAt: date,
        updatedAt: date,
      };
      const newUser = new UserResource(userData);

      // Persist user data
      await userRepository.createUser(newUser);

      const jwtOptions = {
        expiresIn: '24h',  // Expire token in 24 hours
      };

      const authToken = jwt.sign(newUser.data, AUTH_TOKEN_KEY!, jwtOptions);

      return res.status(200).json({
        success: true,
        user: {
          user_id: newUser.id,
          email: newUser.data.email,
          name: newUser.data.name,
          auth_token: authToken,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: `Internal Error` });
    }
  }
);

/**
 * Authenticate a user login session using input email and password if valid.
 */
userRoute.post(
  "/login",
  validateHasParameters("email", "password"),
  async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if user exist AND password supplied is correct
      const user = await userRepository.getUserBy({id: email, matchField: 'email'});
      const userExists = !!user;
      const passwordCorrect = userExists && (await bcrypt.compare(password, user.data.password));
      if(userExists && passwordCorrect) {

        const jwtOptions = {
          expiresIn: '24h',  // Expire token in 24 hours
        };
        
        const authToken = jwt.sign(user.data, AUTH_TOKEN_KEY!, jwtOptions);

        return res.status(200).json({
          success: true,
          user: {
            user_id: user.id,
            email: user.data.email,
            name: user.data.name,
            auth_token: authToken,
          },
        });
      }

      return res.status(400).json({error: 'Invalid Credentials'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: `Server Error` });
    }
  }
);

export default userRoute;
