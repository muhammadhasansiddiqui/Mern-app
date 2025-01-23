import React, { useState } from "react";
import { Await, Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("🚀 ~ handleChange ~ name , value:", name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("Please fill all the fields");
    }
    try {
      const uri = "http://localhost:8080/auth/signup";
      const response = await fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      
      const { success, message , error} = result;
      if (success) {
        handleSuccess(message);
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
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
            autoFocus
            placeholder="Enter name"
            value={signupInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            id="email"
            placeholder="Enter your email"
            value={signupInfo.email}
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
            value={signupInfo.password}
          />
        </div>
        <button>Signup</button>
        <span>
          Already have an account?
          <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
