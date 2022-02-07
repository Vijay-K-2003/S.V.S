import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import customerRoutes from "./routes/customer.js";
import mongoose from "mongoose";
dotenv.config();

const app = express();
MONGO_URL = process.env.MONGO_URL;
mongoose
  .connect(MONGO_URL)
  .then(() => {
    
  })
  .catch((error) => console.log("Something went wrong", error.message));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4000",
    "Access-Control-Allow-Origin": "http://localhost:4000/",
  })
);

app.get("/", (req, res) => {
  res.send("This is my home route!");
});

app.use("/customers", customerRoutes);

app.listen(4000, () => {
  console.log("Listening to port 4000");
});
