import express from "express";
const router = express.Router();
import { getVendor, createVendor, stayVendor } from "../controllers/vendors.js";


router.get("/", getVendor);
router.get("/:id", stayVendor);

router.post("/new", createVendor);

export default router;
