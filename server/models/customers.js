import mongoose from "mongoose";
import Vendor from "../models/vendors.js";
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name cannot be empty!"],
  },
  email: {
    type: String,
    required: [true, "Email cannot be empty!"],
  },
  mobileNumber: {
    type: Number,
    required: [true, "Mobile Number cannot be empty!"],
  },
  latitude: {
    type: Number,
    required: [true, "latitude is required"],
  },
  longitude: {
    type: Number,
    required: [true, "longitude is required"],
  },
  myVendors: {
    type: Array,
    default: [],
  },

});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
