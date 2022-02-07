import Customer from "../models/customers.js";


export const getCustomer = async (req, res) => {
  const customer = await Customer.find({});
 res.status(200).send(customer);
}


export const createCustomer = async (req, res) => {
    // console.log(req.body);
    try {
        // let lat, lng;
        // navigator.geolocation.getCurrentPosition((pos) => {
        //   console.log(pos.coords.latitude);
        //   console.log(pos.coords.longitude);
        // })
        const newCustomer = new Customer(req.body);
            await newCustomer.save();
             res.json(req.body);
        
    } catch (e) {
        res.status(500).json({message: "Error while creating new user"});
    }

};