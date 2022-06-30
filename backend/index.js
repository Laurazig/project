import express from "express";
import cors from "cors";
import { Low, JSONFile } from "lowdb";
import morgan from "morgan";
import coursesRouter from "courses.js"
import registerRouter from "register.js";


const app = express();

const adapter = new JSONFile("./data/db.json");
export const db = new Low(adapter);
await db.read();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use("/courses", coursesRouter);

app.use("/register", registerRouter)

app.listen(3001, () =>{
    console.log("server started on port 3001")
})
