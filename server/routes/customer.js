import express from "express";
const router = express.Router();
import { getCustomer, createCustomer, viewCustomer } from "../controllers/customers.js";

router.get("/", getCustomer);
router.get("/:id", viewCustomer);

router.post("/new", createCustomer);

export default router;
