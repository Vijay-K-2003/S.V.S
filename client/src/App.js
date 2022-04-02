import YourCustomer from "./components/Customer/YourCustomer";
import CreateCustomer from "./components/Customer/CreateCustomer";
import AllVendors from "./components/Vendor/AllVendors";
import CreateVendor from "./components/Vendor/CreateVendor";
import ViewVendor from "./components/Vendor/ViewVendor";
import HomePage from "./components/HomePage";
import StayVendor from "./components/Vendor/StayVendor";
import Notify from "./components/Notify";
import Error from "./components/Error";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ViewCustomer from "./components/Customer/ViewCustomer";
import LoginPage from "./components/LoginPage";
import CustomerVendor from "./components/Customer/CustomerVendor";
import YourVendor from "./components/Vendor/YourVendor";
import EditVendor from "./components/Vendor/EditVendor";
import EditCustomer from "./components/Customer/EditCustomer";
import MyCustomer from "./components/Vendor/MyCustomer";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import './css/App.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function App() {




  return (
    
    <div>
    
      <Router>
       <Navbar/>
    
        <Routes>
     
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>

            <Route element={<PrivateRoute/>}>
        
            
              
            <Route path="getCustomer" element={<YourCustomer/>}></Route>
            <Route path="createCustomer" element={<CreateCustomer />}></Route>
        
            <Route path="createVendor" element={<CreateVendor />}></Route>
            <Route path="/customers/:id/allVendor" element={<AllVendors />} />
          
            <Route path="/customers/:id" element={<ViewCustomer />} />
            <Route path="/customers/:id/edit" element={<EditCustomer />} />
            <Route path="/vendors/:id/edit" element={<EditVendor />} />
            <Route
              path="/customers/:id/myVendors"
              element={<CustomerVendor />}
            />
            <Route path="getVendor" element={<YourVendor />} />
            <Route path="vendors/:id" element={<ViewVendor />} />

            <Route path="/vendors/:id/locate" element={<StayVendor />} />
            <Route path="/vendors/:venid/locate/:id/notify" element={<Notify />} />
            <Route path="/vendors/:id/myCustomers" element={<MyCustomer />} />
            <Route path="/error" element={<Error />} />
          
       
            </Route>
   
   
        </Routes>
      </Router>
    </div>
  );
}
export default App;
