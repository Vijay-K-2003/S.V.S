import Customer from "../models/customers.js";
import Vendor from "../models/vendors.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import twilio from 'twilio';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

export const getCustomer = async (req, res) => {
  const customer = await Customer.find({});
 res.status(200).send(customer);
}




export const createCustomer = async (req, res) => {
    
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
       
    
      
      
      const newCustomer = new Customer(req.body);
        await newCustomer.save();
         res.json(req.body);
       } catch (e) {
        res.status(500).json({message: "Error while creating a customer"});
    }

   
    }
    export const viewCustomer = async(req, res) => {
      try {
        const { id } = req.params;
        const customer = await Customer.findById(id);
        await customer.save();
        res.status(200).json(customer);
        
      } catch (e) {
        res.status(500).json({message: "Error in the view customer"});
      }
   

};


export const addVendor = async (req, res) => {
try {
  const { id, venid } = req.params;
  const customer = await Customer.findById(id);
  const vendor = await Vendor.findById(venid);
  

if(!(customer.myVendors.filter(e => e._id === venid).length > 0))
{
  customer.myVendors.push(vendor);
  await customer.save();
}

  
} catch (e) {
  res.status(500).json({message: "Error in pushing vendor to customer"});
}
};

export const removeVendor = async (req, res) => {
  try {
    const { id, venid } = req.params;
    const customer = await Customer.findById(id);
    const objectId = new mongoose.Types.ObjectId(venid);
    const objectId2 = new mongoose.Types.ObjectId(id);

   await Customer.updateOne({_id: objectId2}, {$pull: {myVendors: {_id: objectId}}});

    
  
    
  } catch (e) {
    console.log(e);
    res.status(500).json({message: "Error in deleting vendor from customer"});
  }
  };

export const notify = async(req, res) => {
  try {
    const {id, venid} = req.params;
    const customer = await Customer.findById(id);
    const vendor = await Vendor.findById(venid);
   
   client.messages.create({
     body: `Your vendor ${vendor.name} and mobile no: ${vendor.mobileNumber} is very near to ur house`,
     from: `whatsapp:${process.env.WATSAAP_FROM}`,       
    //  to: 'whatsapp:+917600966433' //customer.mobileNumber(should be registered)

   }).then((message) => {
console.log(message.sid);
   }).done()

   
    
  } catch (error) {
    res.status(401).json({Message: "Error in notifying customer"})
  }
 
}

export const updateCustomer = async (req, res) => {
  // console.log(req.body);
  const {id} = req.params;
  const customer = await Customer.findByIdAndUpdate(id, req.body);
  await customer.save();
}

export const deleteCustomer = async (req, res) => {
  const {id} = req.params;
  if(mongoose.Types.ObjectId.isValid(id))
   await Customer.findByIdAndDelete(id);

}