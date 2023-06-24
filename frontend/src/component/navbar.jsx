import React from "react";
import "../css/nav.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const checkTodo = () => {
    !localStorage.getItem("userid")
      ? notallow()
      : (window.location.href = "/Todo");
  };
  const checkNotes = () => {
    !localStorage.getItem("userid")
      ? notallow()
      : (window.location.href = "/Notepage");
  };
  function notallow() {
    alert("you have to login first");
    window.location.href = "/Home";
  }
  const logout = () => {
    localStorage.removeItem("userid");
    window.location.href = "/Home";
  };

  return (
    <div>
      <div className="nav">
        <ul>
          <li>
            <Link to="/Home">Home</Link>
          </li>
          <li onClick={checkTodo}>
            <Link>To-do</Link>
          </li>
          <li onClick={checkNotes}>
            <Link>Notes</Link>
          </li>
          <span id="k">
            {!localStorage.getItem("userid") ? (
              <form>
                <li>
                  <Link to="/Signup">Signup</Link>
                </li>
                <li>
                  <Link to="/Login">Login</Link>
                </li>
              </form>
            ) : (
              <li onClick={logout}>
                <Link>Logout</Link>
              </li>
            )}
          </span>
        </ul>
      </div>
    </div>
  );
};
