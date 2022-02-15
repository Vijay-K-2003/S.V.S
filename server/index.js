import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import customerRoutes from "./routes/customer.js";
import vendorRoutes from "./routes/vendor.js";
import mongoose from "mongoose";
import passport from "passport";
import cookieSession from "cookie-session";
import "./oauth.js";
import isLoggedIn from "./middleware.js";
dotenv.config();

const app = express();
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((error) => console.log("Something went wrong", error.message));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cookieSession({
    name: "svs-session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("This is my home route!");
});

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback/",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/good");
  }
);
app.get("/protected", isLoggedIn, (req, res) => {
  res.send("If you are here means you are loggedIn");
});
app.get("/logout", (req, res) => {
  res.session = null;
  req.logout();
  res.redirect("/");
});



app.get("/getUser", isLoggedIn, (req, res) => {
  res.json(200).send(req.user);
});

app.get("/failed", (req, res) => {
  res.send("You have failed to log in");
});

app.use("/customers", customerRoutes);
app.use("/vendors", vendorRoutes);

app.listen(4000, () => {
  console.log("Listening to port 4000");
});
