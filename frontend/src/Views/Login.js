//POST

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to update the value of an input
  const updateData = event => {
    switch (event.target.name) {
      case "username":
        setUsername(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  }

  // Function to attempt to log the current user in
  const attemptLogin = async event => {
    event.preventDefault();

    const loginData = {
      username: username,
      password: password
    }

    const settings = {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    }

    // Make a POST request to the "/login" endpoint in our server...
    // ... and then handle the response from the server
    // ? If we're in the local environment, the request goes to: "http://localhost:3001/login"
    // ? If we're in the production environment, the request goes to "https://herokuapp..../login"
    const response = await fetch(process.env.REACT_APP_SERVER_URL + "/login", settings);
    const parsedRes = await response.json();

    try {
      // If the request was successful
      if (response.ok) {
        // const now = new Date();
        // const tokenExpiry =new Date(now.getTime() + 1000 * 60 *60);
        // localStorage.setItem("data", JSON.stringify({ token:parsedRes.token, id:parsedRes.id, expiry:tokenExpiry.toISOString()}));
        props.login(parsedRes.token, parsedRes.id);
      // If the request was unsuccessful
      } else {
        throw new Error(parsedRes.message);
      }
    } catch (err) {
      alert(err.message)
      setUsername("");
      setPassword("");
    }
  }

  // Function to update the "showLogin" state variable in App.js
  const updateShowLogin = () => {
    props.setShowLogin(false);
  }

  return (
    <div>
      <h1>Login</h1>
      <div className="form">

        <form onSubmit={attemptLogin} >
          <div>
            <label>Username</label>
            <input name="username" onChange={updateData} value={username} />
          </div>
          <div>
            <label>Password</label>
            <input name="password" onChange={updateData} value={password} />
          </div>

          <button className="enterButton">SIGN IN</button>
        </form>
      </div>

      {/* <button className="enterButton" onClick={updateShowLogin}>Not registered yet? Register for an account!</button> */}
      <div className="enterButtons">
        <Link to="/register" className="enterButton">Not registered yet? Register for an account</Link>
      </div>
    </div>
  )
}

export default Login;