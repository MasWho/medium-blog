export type RegisterData = {
  success: boolean,
  createdUser: {
    user_id: string,
    email: string,
    name: string,
    auth_token: string,
  },
} | {
  error: string;
};

export type LoginData = {
  success: boolean,
  loggedInUser: {
    user_id: string,
    email: string,
    name: string,
    auth_token: string,
  },
} | {
  error: string;
}