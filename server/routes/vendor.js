import express from "express";
const router = express.Router();
import { getVendor, createVendor } from "../controllers/vendors.js";


router.get("/", getVendor);


router.post("/new", createVendor);

export default router;
