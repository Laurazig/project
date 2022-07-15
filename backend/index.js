//project abandoned as there were probs with vercel


import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

import globalErrorHandler from "./middleware/globalErrorHandler.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js";
import coursesRouter from "./routes/courses.js";
import teacherRouter  from "./routes/teacher.js"

import cookieParser from "cookie-parser";

const app = express();

// Initiate dotenv so you can use environment variables
dotenv.config();

// mongoose.connect("mongodb://localhost:27017/fullstack-project")   //compass

// mongoose.connect("mongodb+srv://n42:bongo@cluster0.r46gvie.mongodb.net/fullstack-project?retryWrites=true&w=majority")
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.r46gvie.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)

// Callbacks for mongoose - one for if the db connection opens successfully, another for if there's an error
mongoose.connection.on("open", () => console.log("Database connection established"));
mongoose.connection.on("error", () => console.error);

// Allows ALL cors requests to all our routes
app.use(cors({origin: "http://localhost:3000", credentials:true}));
// app.use(cors({origin: "https://fullstack-project-june2022-laurahesse.vercel.app", credentials:true}));

app.use(cookieParser())

// We can use express's .json() method to parse JSON data received in any request
app.use(express.json());

// Register our "logger" middleware (no longer used - now we are using "morgan" for logging)
// app.use(logger);

// Use morgan to make a small log every time a request is received
app.use(morgan("tiny"));

app.use("/register", registerRouter);

app.use("/login", loginRouter);

app.use("/users", usersRouter);

app.use("/courses", coursesRouter);

app.use("/teacher", teacherRouter);


// The last registered middleware = global error handler
app.use(globalErrorHandler);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server has started on port ${process.env.port || 3001}!`);
})
