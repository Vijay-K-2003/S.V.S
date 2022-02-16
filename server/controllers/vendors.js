import Vendor from "../models/vendors.js";

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

export const stayVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findById(id);
    res.status(200).json(vendor);
  } catch(e) {
    console.log(e);
    res.status(500).json({
      message: "Error Occurred in Stay Vendor",
    });
  }
};

