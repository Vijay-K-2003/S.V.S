import Vendor from "../models/vendors.js";
import Customer from "../models/customers.js";
import mongoose from "mongoose";

export const getVendor = async (req, res) => {
  const vendor = await Vendor.find({});
  res.status(200).send(vendor);
};

export const createVendor = async (req, res) => {
  try {
    const customer = await Customer.find({});
    const vendor = await Vendor.find({});
  // customer.map((e) => {
    //   if(e.email === req.body.email)
    //   {
    //     res.status(400).json({message: "A Customer already exists with the same account"});
    //   }
    // })

    // vendor.map((e) => {
    //   if(e.email === req.body.email)
    //   {
    //     res.status(400).json({message: "A Vendor already exists with the same account"});
    //   }
    // })
    const newVendor = new Vendor(req.body);
    await newVendor.save();
    res.status(200).json("Done");
  } catch (e) {
  
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
    
    res.status(500).json({
      message: "Error Occurred in Stay Vendor",
    });
  }
};

export const vendorCustomer = async (req, res) => {
 try {
   const {id} = req.params;
   const objectId = new mongoose.Types.ObjectId(id);

   const customer = await Customer.find({'myVendors._id': objectId})
   res.status(200).json(customer);
   
 } catch (e) {
  res.status(401).json({
    message: "Error finding vendors customer",
  });
 }
}

export const deleteVendor = async (req, res) => {
  try {
    
    const {id }= req.params;
    // res.send(id);
    
    // console.log("I am in delete vendor");
    const objectId = new mongoose.Types.ObjectId(id);
 
    // if(mongoose.Types.ObjectId.isValid(venid))
     await Vendor.findByIdAndDelete(id);
    
// console.log(objectId);
     await Customer.updateMany({}, {$pull: {myVendors: {_id: objectId}}});
    
  res.status(200).json("Done");
   
   
  } catch (e) {
  
    res.status(401).json({
      message: "Error Occurred in delete Vendor",
    });
  }
}

export const updateVendor = async (req, res) => {
  try {
    const {id} = req.params;
  const {name, mobileNumber, area} = req.body;
  const objectId = new mongoose.Types.ObjectId(id);
  const customer = await Customer.find({});
  const ven = await Vendor.find({});
  const venn = await Vendor.findById(id);
  const vendor = await Vendor.findByIdAndUpdate(id, req.body);
  // vendor.items.map((e) => {

  // })
  await vendor.save();

  await Customer.updateMany( {'myVendors._id': objectId}, {$set: {'myVendors.$._id': objectId,'myVendors.$.name': req.body.name, 'myVendors.$.mobileNumber': req.body.mobileNumber, 'myVendors.$.area': req.body.area, 'myVendors.$.items': req.body.items}});
    res.status(200).json("Done");
  } catch (e) {
    res.status(401).message({Message: "Error in updating the vendor"});
  }
  
}

