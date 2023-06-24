import React, { useState } from "react";
import "../css/signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignup = async () => {
    const response = await fetch("http://localhost:8090/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        phone,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success === true) {
      window.location.href = "/Login";
    } else {
      alert("Email already exist");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhone("");
    }
  };
  return (
    <div className="signup-page">
      <div className="signup">
        <form>
          <h1>Sign Up</h1>
          <label>User Name:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            required
          ></input>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email id"
            required
          ></input>
          <label>Phone no:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone no."
            required
          ></input>
          <label>Pasword:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create password"
            required
          ></input>
          <label>Confirm Pasword:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter password again"
            required
          ></input>

          <button onClick={handleSignup} type="button">
            Create Account
          </button>
          <a href="/Login">Already have account?</a>
        </form>
      </div>
    </div>
  );
};

export default Signup;
