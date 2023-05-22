import database from "../_db/db";

export const createUser = async (
  username: string,
  password: string
) => {
  const user = {
    id: Math.random()
      .toString(36)
      .substr(2, 9),
    username,
    password,
  };

  database.insert("users", user);

  return user;
};

export const validateUser = async (
  username: string,
  password: string
) => {
  const users = database.get("users");
  const userExists = users.find(
    (u: any) =>
      u.username === username &&
      u.password === password
  );
  if (userExists) return true;

  return false;
};
