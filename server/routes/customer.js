import express from "express";
const router = express.Router();
import { getCustomer, createCustomer, viewCustomer } from "../controllers/customers.js";
import isLoggedIn from "../middleware.js";

router.get("/", isLoggedIn, getCustomer);
router.get("/:id", viewCustomer);

router.post("/new", createCustomer);

export default router;
