import Vendor from "../models/vendors.js";
import Customer from "../models/customers.js";

export const getVendor = async (req, res) => {
  const vendor = await Vendor.find({});
  res.status(200).send(vendor);
};

export const createVendor = async (req, res) => {
  try {
  
    const newVendor = new Vendor(req.body);
    await newVendor.save();
    res.json(req.body);
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

export const deleteVendor = async (req, res) => {
  try {
    
    const {id }= req.params;
    // res.send(id);
    console.log("I am in delete vendor");
    // console.log(venid.toString().trim());
    // if(mongoose.Types.ObjectId.isValid(venid))
    //  await Vendor.findByIdAndDelete(id);
    const customers = await Customer.find({});
    // console.log(customers);
 customers.map((cust) => {
   cust.myVendors.map((e) => {
    
      if(e._id.toString() === id)
      {
        //  filter((e) => e._id.toString() !== id);
        // console.log(e);
        
      
      }
    
     
   })
 })
    // res.send(vendor);

    // Delete from customer.myVendors
    // Customer.myVendors.map((e) => {
    //   if(e._id === venid)
    //   {
    //     Customer.findByIdAndUpdate(id, {$pull: {_id: venid}});
    //       }
    // })
  } catch (e) {
  
    res.status(401).json({
      message: "Error Occurred in delete Vendor",
    });
  }
}

