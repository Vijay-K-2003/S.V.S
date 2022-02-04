import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

mongoose.connect('mongodb://localhost:27017/svs')
.then((res) => {
    console.log("Database Connected");
})
.catch((err) => {
    console.log("Database connected error", err);
});

const app = express();

app.get('/', (req, res) =>{
    res.send("Hey we made it!");
})

app.listen(4000, () =>{
    console.log("Listning to port 4000");
})

