import express from "express";
const router = express.Router();
import { getVendor, createVendor, stayVendor, deleteVendor, updateVendor, vendorCustomer } from "../controllers/vendors.js";


router.get("/", getVendor);
router.get("/:id", stayVendor);
router.get("/:id/myCustomers", vendorCustomer);
router.delete("/:id/delete", deleteVendor);
router.put("/:id/edit", updateVendor);
router.post("/new", createVendor);

export default router;
