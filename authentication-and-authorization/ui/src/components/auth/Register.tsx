// Global imports
import { useEffect, useState, useContext, FormEventHandler } from 'react';

// Project dependencies
import useApi from '../../hooks/api/useApi';
import Spinner from '../../components/shared/Spinner';
import AuthContext from '../../store/auth/AuthContextProvider';
import { validatePasswordLength, validateEmailFormat } from './validations';
import { RegisterData } from '../../hooks/api/apiData';
import { Link } from 'react-router-dom';

/**
 * Component for user sign up, requires the user to input name, email and password.
 * Upon success signup user will be redirected to home page.
 * @returns 
 */
const Register = () => {
  const [authData, setAuthData] = useState<RegisterData>();
  const {loading, request, error, setError} = useApi();
  const {globalLogInDispatch} = useContext(AuthContext);

  // Upon successful response from the api for registering new user, dispatch global auth LOG_IN event
  useEffect(() => {
    if(authData && 'success' in authData) {
      globalLogInDispatch({
        authToken: authData.createdUser.auth_token,
        userId: authData.createdUser.user_id,
        name: authData.createdUser.name,
        email: authData.createdUser.email
      });
    }
  }, [authData, globalLogInDispatch]);
  
  /**
   * Upon submission of the sign up form:
   *  - Validate email format, password length
   *  - attempt to create the new user by calling /user/register ith th provided name, email and password
   * @param {object} event 
   */
  const signUpHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Validations first!
    const userEmail = data.get('email');
    const userPassword = data.get('password');
    const userName = data.get('name');
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
          name: userName,
        }),
      };
      await request('/user/register', params, setAuthData);
    } catch (error: any) {
      setError(error.message || error);
    }
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={signUpHandler}>
        <label htmlFor='name'>Name</label>
        <input id="name" name="name" type="text" required placeholder='Full Name' />
        <label htmlFor='email'>Email</label>
        <input id="email" name="email" type="email" required placeholder='Email Address' />
        <label htmlFor='password'>Password</label>
        <input id="password" name="password" type="password" required placeholder='Password' />
        <button type="submit">Submit</button>
        <Link to={'/user/login'}>Already have an account? Sign in</Link>
      </form>
    </>
  );
}

export default Register;