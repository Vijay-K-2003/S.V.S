import express from "express";
const router = express.Router();
import { getVendor, createVendor } from "../controllers/vendors.js";
import isLoggedIn from "../middleware.js";

router.get("/", getVendor);

router.post("/new", isLoggedIn, createVendor);

export default router;
