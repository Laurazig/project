//register new user- create account

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [teacher, setTeacher] = useState(false)

  const updateData = event => {
    switch (event.target.name) {
      case "username":
        setUsername(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "firstName":
        setFirstName(event.target.value);
        break;
      case "lastName":
        setLastName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "teacher":
        setTeacher(event.target.value);
        break;
      default:
        break;
    }
  }

  // Function to register a new user
  const registerUser = async event => {
    event.preventDefault();

    // Create a "new user" object using the data the user entered in the form
    const newUser = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      emailAddress: email,
      teacher: teacher
    }

    // Create a "settings" object to define our POST request
    const settings = {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json"
      },
      Credentials: "include"
    }
    console.log(process.env.REACT_APP_SERVER_URL)

    // Make a POST request to the "/register" endpoint in our server...
    // ... and then handle the response from the server
    const response = await fetch(process.env.REACT_APP_SERVER_URL + "/register", settings);
    const parsedRes = await response.json();

    try {
      // If the request was successful...
      if (response.ok) {
        // const now = new Date();
        // const tokenExpiry =new Date(now.getTime() + 1000 * 60 *60);
        // localStorage.setItem("data", JSON.stringify({ token:parsedRes.token, id:parsedRes.id, expiry:tokenExpiry.toISOString()}));
        props.login(parsedRes.token, parsedRes.id);
      } else {
        throw new Error(parsedRes.message);
      }
    } catch (err) {
      alert(err.message);
    }
  }


  // Function to update the "showLogin" state variable in App.js
  const updateShowLogin = () => {
    props.setShowLogin(true);
  }

  return (
    <div>
      <h1>Register</h1>
      <div className="form">
        <form onSubmit={registerUser}>
          <div>
            <label>Username</label>
            <input name="username" onChange={updateData} value={username} />
          </div>
          <div>
            <label>Password</label>
            <input name="password" onChange={updateData} value={password} />
          </div>
          <div>
            <label>First Name</label>
            <input name="firstName" onChange={updateData} value={firstName} />
          </div>
          <div>
            <label>Last Name</label>
            <input name="lastName" onChange={updateData} value={lastName} />
          </div>
          <div>
            <label>Email Address</label>
            <input name="email" onChange={updateData} value={email} />
          </div>
          <div>
            <label className="workshopFormBlock">Are you a teacher offering courses?</label>
            <input className="radio_input radio_input_right" type="radio" name="news_letter" onClick={updateData} value="yes" />
            <label className="radio_label">Yes</label>
            <input className="radio_input radio_input_left" type="radio" name="news_letter" onClick={updateData} value="no" />
            <label className="radio_label">No</label>
            {/* why is checked on no?  checked={newsLetter !== "yes"}*/}
            
          </div>

          <button className="enterButton">SIGN UP</button>
        </form>
      </div>

      {/* <button className="enterButton" onClick={updateShowLogin}>Already registered? Log in to your account!</button>       */}
      <div className="enterButtons">
        <Link to="/login" className="enterButton">Already registered? Log in to your account</Link>
      </div>
    </div>
  )
}

export default Register;