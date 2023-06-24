import React, { useState } from "react";
import "../css/login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePass = (e) => {
    setPassword(e.target.value);
  };

  const getData = async () => {
    const response = await fetch("http://localhost:8090/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success === true) {
      window.location.href = "/home";
      localStorage.setItem("userid", JSON.stringify(json.data));
    } else {
      alert("Invalid credentials");
    }
  };
  return (
    <div className="login">
      <div className="container">
        <div class="title">Login</div>
        <div class="content">
          <div class="user-details">
            <div class="ibox">
              <span class="details">Email</span>
              <input
                type="text"
                value={email}
                onChange={(e) => handleEmail(e)}
                placeholder="Enter your email"
              />
            </div>
            <div class="ibox">
              <span class="details">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => handlePass(e)}
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="butt" align="center">
            <button type="button" className="but" onClick={getData}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
