// server/src/middleware/auth.ts

// Global dependencies
import jwt, { JwtPayload } from 'jsonwebtoken';
const { AUTH_TOKEN_KEY } = process.env;

// Project dependencies
import userRepository from '../repositories/UserRepository';

/**
 * Auth middleware for checking incoming request headers and verifies if an auth token
 * exists within the query and is valid.
 * If auth token is valid then inserts user details into the request object
 * @param {object} req 
 * @param {object} res 
 * @param {Function} next 
 * @returns 
 */
export const checkAuthToken = async (req: any, res: any, next: any) => {
  const auth_token = req.headers["x-access-token"] as string;

  try {
    if (!auth_token) {
      throw new Error('Unauthorized');
    }

    const decodedUserInfo = jwt.verify(auth_token, AUTH_TOKEN_KEY!) as JwtPayload;
    // Check if user actually exist in db
    const user = await userRepository.getUserBy({ id: decodedUserInfo.email, matchField: 'email' });
    if(!user) {
      throw new Error('Unauthorized');
    }

    req.user = {...user.data, ...decodedUserInfo};
  } catch (error) {
    return res.status(403).json({error: 'Unauthorized'});
  }
  
  return next();
};