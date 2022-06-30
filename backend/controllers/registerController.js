import { db } from "../index.js";
import { v4 as uuid } from "uuid";

export const registerPost= (req,res) => {
    const {username,password, firstName, lastName, emailAddress } = req.body;
    const newUser = {
        id: uuid(),
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        courses: []
    }

    db.data.users.push(newUser);
    db.write();
    res.status(201).json(newUser);
}