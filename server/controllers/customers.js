import Customer from "../models/customers.js";


export const getCustomer = async (req, res) => {
  const customer = await Customer.find({});
 res.status(200).send(customer);
}


export const createCustomer = async (req, res) => {
    
    try {
        console.log(req.body);
       
        const newCustomer = new Customer(req.body);
        
        await newCustomer.save();
         res.json(req.body);
       } catch (e) {
        res.status(500).json({message: "Vijay sir"});
    }

   
    }
    export const viewCustomer = async(req, res) => {
      try {
        const { id } = req.params;
        const customer = await Customer.findById(id);
        console.log(customer);
        await customer.save();
        
      } catch (e) {
        
      }
   

};