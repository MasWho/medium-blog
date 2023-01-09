// Global imports
import { useEffect, useState, useContext, FormEventHandler } from 'react';

// Project dependencies
import useApi from '../../hooks/api/useApi';
import Spinner from '../shared/Spinner';
import AuthContext from '../../store/auth/AuthContextProvider';
import { validatePasswordLength, validateEmailFormat } from './validations';
import { LoginData } from '../../hooks/api/apiData';
import { Link } from 'react-router-dom';
import styles from './Auth.module.css';

/**
 * Component for user login, requires the user to input email and password.
 * Upon success login, user will be redirected to home page.
 * @returns 
 */
const Login = () => {
  const [authData, setAuthData] = useState<LoginData>();
  const {loading, request, error, setError} = useApi();
  const {globalLogInDispatch} = useContext(AuthContext);

  // Upon successful response from the api for login user, dispatch global auth LOG_IN event
  useEffect(() => {
    if(authData && 'success' in authData) {
      globalLogInDispatch({
        authToken: authData.loggedInUser.auth_token,
        userId: authData.loggedInUser.user_id,
        name: authData.loggedInUser.name,
        email: authData.loggedInUser.email
      });
    }
  }, [authData, globalLogInDispatch]);
  
  /**
   * Upon submission of the login form:
   *  - Validate email format, password length
   *  - attempt to login user by calling /user/login ith th provided email and password
   * @param {object} event 
   */
  const loginHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Validations first!
    const userEmail = data.get('email');
    const userPassword = data.get('password');
    try {
      if(!validateEmailFormat(userEmail?.toString() || '') || !validatePasswordLength(userPassword?.toString() || '')) {
        throw new Error("Incorrect credential format!");
      }
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      };
      await request('/user/login', params, setAuthData);
    } catch (error: any) {
      setError(error.message || error);
    }
  };

  return (
    <>
      <h2>Log In</h2>
      <form onSubmit={loginHandler} className={styles.Form}>
        <div className={styles.Input}>
          <label htmlFor='email'>Email</label>
          <input id="email" name="email" type="email" required placeholder='Email Address' />
        </div>
        <div className={styles.Input}>
          <label htmlFor='password'>Password</label>
          <input id="password" name="password" type="password" required placeholder='Password' />
        </div>
        <button type="submit">Submit</button>
        <Link className={styles.Link} to={'/user/register'}>Don't have an account? Sign up</Link>
      </form>
    </>
  );
}

export default Login;