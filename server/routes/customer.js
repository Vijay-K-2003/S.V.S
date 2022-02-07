import express from "express";
const router = express.Router();
import { getCustomer, createCustomer } from "../controllers/customers.js";

router.get("/", getCustomer);

router.post("/new", createCustomer);
