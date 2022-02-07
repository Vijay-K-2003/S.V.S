import Customer from "../models/customers.js";


export const getCustomer = async (req, res) => {
    const Customers = Customer.find({}, (err, result) => {
        if(err)
        {
            res.status(500).json(err);
        }
        else{
            res.json(result);
        }
    })

}


export const createCustomer = async (req, res) => {
    // console.log(req.body);
    try {
        const newCustomer = new Customer(req.body);
            await newCustomer.save();
             res.json(req.body);
        
    } catch (e) {
        res.status(500).json({message: "Error while creating new user"});
    }

};