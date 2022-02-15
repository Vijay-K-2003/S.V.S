import express from "express";
const router = express.Router();
import { getVendor, createVendor, addVendor } from "../controllers/vendors.js";


router.get("/", getVendor);
router.post("/customers/:id/allVendor/:venid", addVendor);

router.post("/new", createVendor);

export default router;
