import express from "express"
const app = express();
app.get("/", (req,res,next) => {
    res.send("<h1>Hello World</h1>")
});
app.listen(3000, () =>{
    console.log("server started on port 3000")
})

