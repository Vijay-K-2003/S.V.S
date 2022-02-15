import Vendor from "../models/vendors.js";
import Customer from "../models/customers.js";

export const getVendor = async (req, res) => {
  const vendor = await Vendor.find({});
  res.status(200).send(vendor);
};

export const createVendor = async (req, res) => {
  try {
    console.log(req.body);

    const newVendor = new Vendor(req.body);

    await newVendor.save();
    res.json(req.body);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Error Occurred",
    });
  }
};

export const addVendor = async (req, res) => {
    console.log(req.params);
  try {
    const { id, venid } = req.params;
    const customer = Customer.findById(id);
    const vendor = Vendor.findById(venid);
    customer.myVendors.push(vendor);
    await customer.save();
    console.log(customer);
  } catch (e) {
    console.log(e);
  }
};
