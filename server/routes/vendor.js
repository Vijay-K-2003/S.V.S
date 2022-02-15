import express from "express";
const router = express.Router();
import { getVendor, createVendor, addVendor } from "../controllers/vendors.js";
import isLoggedIn from "../middleware.js";

router.get("/", getVendor);
router.get("/customers/:id/allVendor/:venid", addVendor);

router.post("/new", createVendor);

export default router;
