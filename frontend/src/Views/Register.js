import React, { useState } from "react";

const register = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

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
            default:
                break;
        }
    }
    const submitForm = event =>{
        event.preventDefault()
        const newUser = {
            username:username,
            password:password,
            firstName:firstName,
            lastName:lastName,
            email:email
        }
        const settings ={
            method: "POST",
            body: JSON.stringify(newUser),
            headers: { "Content-Type": "application/json"}
        }
        fetch("http//localhost:3001/register", settings)
            .then(response => response.json)
            .then(data => {
                console.log();
                props.
                props.
            })
    }
}