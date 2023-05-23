import { User } from "../_db/schema";

export const createUser = async (
  username: string,
  password: string
) => {
  const newUser = await User.create({username, password});
  return newUser;
};

export const validateUser = async (
  username: string,
  password: string
) => {
  const user = await User.findOne({where: {username, password}});
  const userExists = !!user;
  if (userExists) return true;
  return false;
};
