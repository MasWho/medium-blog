/* ui/src/App.tsx */

import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import AuthContext from "./store/auth/AuthContextProvider";
import { useContext } from "react";
import Register from "./components/auth/Register";
import Login from "./components/auth/LogIn";
import Resource from "./components/resource/Resource";

function App() {
  const { authState } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={authState.isLoggedIn ? location.pathname : "/user/login"}
            />
          }
        />
        {!authState.isLoggedIn && (
          <Route path="user">
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
        )}
        {authState.isLoggedIn && (
          <Route path="resource" element={<Resource />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
