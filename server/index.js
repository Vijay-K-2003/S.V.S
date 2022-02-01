import express from "express";
import mongoose from "mongoose";

const app = express();

app.get('/', (rea, res) =>{
    res.send("Hey we made it!");
})

app.listen(4000, (req, res) =>{
    console.log("Listning to port 4000");
})

