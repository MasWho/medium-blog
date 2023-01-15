/* ui/src/hooks/api/apiData.ts */

export type AuthData = {
  success: boolean,
  user: {
    user_id: string,
    email: string,
    name: string,
    auth_token: string,
  },
};