import React, { useState } from "react";
import { Await, Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("🚀 ~ handleChange ~ name , value:", name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Please fill all the fields");
    }
    try {
      const uri = "http://localhost:8080/auth/login";
      const response = await fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      
      const { success, message , jwtToken,name, error} = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } 
      else if (error) {
        const details = error?.details[0].message;
        handleError(details);
        
      }
      else if (!success) {
        handleError(message);
      }
      console.log("🚀 ~ handleSignup ~ result:", result);
    

    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            id="email"
            placeholder="Enter your email"
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={loginInfo.password}
          />
        </div>
        <button>Login</button>
        <span>
          
          Doesn't have an account?{" "}

          <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
