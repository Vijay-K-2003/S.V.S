import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import customerRoutes from "./routes/customer.js";


dotenv.config();

const app = express();






app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(
{
  origin: 'http://localhost:4000',
  'Access-Control-Allow-Origin': 'http://localhost:4000/',
}
));

app.get('/', (req, res) => {
  res.send("This is my home route!");
})

app.use('/customers', customerRoutes);

app.listen(4000, () => {
  console.log("Listning to port 4000");

});
