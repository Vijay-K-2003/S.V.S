// require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

const __dirname = path.resolve();

dotenv.config();
// mongoose
//   .connect("mongodb://localhost:27017/svs")
//   .then((res) => {
//     console.log("Database Connected");
//   })
//   .catch((err) => {
//     console.log("Database connected error", err);
//   });

const app = express();
// app.set('view engine', 'html');
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, 'public')));



app.use(express.static(path.join(__dirname+ '/public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(
{
  origin: 'http://localhost:4000',
  'Access-Control-Allow-Origin': 'http://localhost:4000/',
}
));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

// var whitelist = ['http://localhost:4000', 'http://localhost:3000']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/map.html'));
    //__dirname : It will resolve to your project folder.
})
app.listen(4000, () => {
  console.log("Listning to port 4000");

});
