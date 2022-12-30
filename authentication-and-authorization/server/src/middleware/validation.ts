import { NextFunction, Request, Response } from "express";

/**
 * Middleware to validate if a incoming post request body has required parameters
 * @param  {...any} args 
 * @returns 
 */
export const validateHasParameters = (...args: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    let valid = true;

    for (const arg of args) {
      if (body[arg] === undefined) {
        res.status(403).json({ error: arg + " not specified" });
        valid = false;
        break;
      }
    }

    if (valid) {
      next();
    }
  };
};

/**
 * Checks if a password passes the length check i.e. longer than 7 characters
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 */
export const validatePasswordLength = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if(!!password && password.length > 7) {
    next();
  } else {
    res.status(403).json({ error: "The passowrd provided is not valid" });
  }

};

/**
 * Checks if an email passes valid email check e.g. have @ etc
 * @param {object} req 
 * @param {object} res 
 * @param {object} next  
 */
export const validateEmailFormat = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!!email && re.test(String(email).toLowerCase())) {
    next();
  } else {
    res.status(403).json({ error: "The email provided is not valid" });
  }
};