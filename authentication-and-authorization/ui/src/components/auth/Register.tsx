/* ui/src/components/auth/Register.tsx */

// Global imports
import { useEffect, useState, useContext, FormEventHandler } from "react";

// Project dependencies
import useApi from "../../hooks/api/useApi";
import AuthContext from "../../store/auth/AuthContextProvider";
import { validatePasswordLength, validateEmailFormat } from "./validations";
import { RegisterData } from "../../hooks/api/apiData";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";

const Register = () => {
  const [authData, setAuthData] = useState<RegisterData>();
  const { request, setError } = useApi();
  const { globalLogInDispatch } = useContext(AuthContext);

  // Upon successful response from the api for registering new user, dispatch global auth LOG_IN event
  useEffect(() => {
    if (authData && "success" in authData) {
      globalLogInDispatch({
        authToken: authData.createdUser.auth_token,
        userId: authData.createdUser.user_id,
        name: authData.createdUser.name,
        email: authData.createdUser.email,
      });
    }
  }, [authData, globalLogInDispatch]);

  const signUpHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Validations first!
    const userEmail = data.get("email");
    const userPassword = data.get("password");
    const userName = data.get("name");
    try {
      if (
        !validateEmailFormat(userEmail?.toString() || "") ||
        !validatePasswordLength(userPassword?.toString() || "")
      ) {
        throw new Error("Incorrect credential format!");
      }
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
          name: userName,
        }),
      };
      await request("/user/register", params, setAuthData);
    } catch (error: any) {
      setError(error.message || error);
    }
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={signUpHandler} className={styles.Form}>
        <div className={styles.Input}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Full Name"
          />
        </div>
        <div className={styles.Input}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email Address"
          />
        </div>
        <div className={styles.Input}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Password"
          />
        </div>
        <button type="submit">Submit</button>
        <Link className={styles.Link} to={"/user/login"}>
          Already have an account? Sign in
        </Link>
      </form>
    </>
  );
};

export default Register;
