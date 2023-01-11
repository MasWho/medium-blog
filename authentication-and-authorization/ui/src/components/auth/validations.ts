/* ui/src/components/auth/validations.ts */

export const validatePasswordLength = (password: string) => {
  return !!password && password.length > 7;
};

export const validateEmailFormat = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !!email && re.test(String(email).toLowerCase());
};
