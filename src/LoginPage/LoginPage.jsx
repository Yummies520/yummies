import React, { useState } from "react";
import "../LoginPage/LoginPage.css";
import BackIcon from "../Assests/angle-circle-arrow-left-icon.svg";

const LoginForm = () => {
  const logInForm = { uName: "", pass: "" };
  const [loginCred, setLoginCred] = useState(logInForm);
  const [formErrorMsg, setFormErrorMsg] = useState('Please log in');

  const handleUserName = (e) => {
    setLoginCred({...loginCred, uName: e.target.value });
  };

  const handlePassword = (e) => {
    setLoginCred({...loginCred, pass: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if(loginCred.uName == "admin"){
      if(loginCred.pass == "admin"){
        window.location.href = '/HomePage';
        // sessionStorage.setItem('loggedIn',true)
      }else{
        setFormErrorMsg('Entered Password is wrong')
      }
    }else{
      setFormErrorMsg('Entered UserName is wrong')
    }
    setLoginCred({uName:'',pass:''})
  }
  return (
    <div>
      <form className="login" onSubmit={handleLoginSubmit}>
        <h2>Welcome, Admin</h2>
        <p>{formErrorMsg}</p>
        <input
          type="text"
          placeholder="User Name"
          onChange={handleUserName}
          value={loginCred.uName}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handlePassword}
          value={loginCred.pass}
        />
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
};

export default LoginForm;
