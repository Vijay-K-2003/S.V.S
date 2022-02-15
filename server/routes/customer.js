import express from "express";
const router = express.Router();
import { getCustomer, createCustomer, viewCustomer } from "../controllers/customers.js";
import { getVendor } from "../controllers/vendors.js";
import isLoggedIn from "../middleware.js";

router.get("/", getCustomer);
router.get("/:id", viewCustomer);
router.get("/:id/allVendor", getVendor);

router.post("/new", createCustomer);

export default router;
