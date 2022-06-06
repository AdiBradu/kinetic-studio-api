import React, { useState, useContext } from "react";
import "./Login.component.scss";
import Input from "../Input/Input.component";
import ButtonLogin from "../Buttons/Login/ButtonLogin.component";
import { AppContext } from "../../../AppContext";
import Admin from "../../../data/admin.json";
import { Link } from "react-router-dom";
import { LOGIN } from "../../../graphql/mutations";
import { useMutation } from "@apollo/client";

export default function Login() {
  const { isLoggedInObj } = useContext(AppContext);
  const setIsLoggedIn = isLoggedInObj[1];
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loginUsr, loginUsrObj] = useMutation(LOGIN);

  const handleChange = (e) => {
    const value = e.target.value;
    setCredentials({
      ...credentials,
      [e.target.name]: value,
    });
  };

  const handleLogin = () => {  
    loginUsr({
      variables: {
        email: credentials.email,
        password: credentials.password
      }
    });
    
  };

  return (
    <div className="login">
      <Input
        value={credentials.email}
        handleChange={handleChange}
        name="email"
        label={"email"}
        type={"email"}
        placeholder={"email"}
      />
      <Input
        value={credentials.password}
        handleChange={handleChange}
        name="password"
        label={"password"}
        type={"password"}
        placeholder={"password"}
      />
      <Link to={`/dashboard`} onClick={() => {
              loginUsr({
                variables: {
                  email: credentials.email,
                  password: credentials.password
                }
              });  
              setIsLoggedIn(loginUsrObj?.data?.login);
      }}>
        <ButtonLogin />
      </Link>
    </div>
  );
}
