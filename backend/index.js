import express from "express"

const app = express();
app.get("/", (req,res,next) => {
    res.send("<h1>Hello World</h1>")
});
app.listen(3000, () =>{
    console.log("server started on port 3000")
})

app.get("/test", (req,res,next)=>{
    res.send("<h1> this is the /test route </h1>")
})

//mongoose.connect("mongodb://localhost:27017/***");
//mongoose.connect("mongodb://localhost:27017/***"); copy from mongoDB website
//npm install dotenv