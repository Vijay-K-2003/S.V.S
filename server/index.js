import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import customerRoutes from "./routes/customer.js";
import vendorRoutes from "./routes/vendor.js";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
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
app.use(session({
  secret: process.env.SESSION_SECRET,
  maxAge: 24*60*60,
saveUninitialized: true,
resave: false
}))


const corsOptions ={
  origin:'http://localhost:3000', 
  headers: "*", methods: "*",
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions));
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
    res.redirect("http://localhost:3000");
  }
);
app.get("/protected", isLoggedIn, (req, res) => {
  res.send("If you are here means you are loggedIn");
});
app.get("/logout", (req, res) => {
  if(req.user)
  {
  res.session = null;
  req.logout();
  res.send("success");
  }

});



app.get("/getUser", (req, res) => {
  res.send(req.user);
});

app.get("/failed", (req, res) => {
  res.send("You have failed to log in");
});


app.use("/customers", customerRoutes);
app.use("/vendors", vendorRoutes);
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
