import './Main.css';
//still learning routing but its very cool
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from "./Header/Navbar";
import Body from "./Body/Body.jsx";
import { LogIn } from './Accounts/LogIn.jsx';
import { SignUp } from './Accounts/SignUp.jsx';
import About from './Extra/About.jsx';
import Order from './Order/Order.jsx';
import Profile from './Profiles/Profile.jsx';
import FoodList from './FoodList/FoodList.jsx';
import { DropDownProvider } from './UserContext/DropDownContext.jsx';
import LiveOrders from './Order/LiveOrders.jsx';
import ManageDel from './Profiles/AdminBackEnd/ManageDel.jsx';
import ManageUsers from './Profiles/AdminBackEnd/ManageUsers.jsx';
import ProtectedRoutes from './ProtectedRoutes.jsx';


function App() {

  return (

    <BrowserRouter>
      {/* to share values between components the providor
    needs to have all the componets needed as children */}
      <DropDownProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Body />} />
          <Route path='/foodList' element={<FoodList />} />
          <Route path='/about' element={<About />} />

          <Route element={<ProtectedRoutes roles={'noUser'} />}>
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/signUp" element={<SignUp />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path='/profile' element={<Profile />} />
          </Route>

          <Route element={<ProtectedRoutes roles='customer' />}>
            <Route path='/order' element={<Order />} />
          </Route>

          <Route element={<ProtectedRoutes roles='delivery' />}>
            <Route path='/ordersLive' element={<LiveOrders />} />
          </Route>

          <Route element={<ProtectedRoutes roles='admin' />}>
            <Route path='/manageDeliveries' element={<ManageDel />} />
            <Route path='/manageUsers' element={<ManageUsers />} />
          </Route>

        </Routes>
      </DropDownProvider>
    </BrowserRouter>
  );
}

export default App;
