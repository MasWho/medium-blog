/**
 * Checks if a password passes the length check i.e. longer than 7 characters
 * @param {string} password
 */
export const validatePasswordLength = (password: string) => {
  return !!password && password.length > 7;
};

/**
 * Checks if an email passes valid email check e.g. have @ etc
 * @param {string} email
 */
export const validateEmailFormat = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !!email && re.test(String(email).toLowerCase());
};