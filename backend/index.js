// using code from 30th May   - backend_albums-project-v2-Laurazig-1
//shows db -> mongoDB  & new error to createError

import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js"; 
import mongoose from "mongoose";

const app = express();
dotenv.config()

// mongoose.connect("mongodb://localhost:27017/fullstack-project")   //compass

mongoose.connect("mongodb+srv://n42:bongo@cluster0.r46gvie.mongodb.net/fullstack-project?retryWrites=true&w=majority")

//COMPASS:          mongodb+srv://n42:<password>@cluster0.r46gvie.mongodb.net/test
//mongoose.connect("mongodb+srv://{process.env.DB_USERNAME}:{process.env.DB_PASSWORD}@cluster0.r46gvie.mongodb.net/{process.env.DB_NAME}?retryWrites=true&w=majority") 
mongoose.connection.on("open", ()=> console.log("Database  connection established"));
mongoose.connection.on("error",()=> console.error);

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use(globalErrorHandler);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server has started on port ${process.env.port || 3001}!`);
})
