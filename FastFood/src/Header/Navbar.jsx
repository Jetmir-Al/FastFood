import { useContext } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../UserContext/Context';
import { DropDown } from './DropDown';

function Navbar() {
    // gonna need to add orders and deliveries, maybe remove about and add it
    //to body, and maybe add contact and the most know C2024 jetmir
    //at the end of web

    let location = useLocation();
    let accountLinks = null;
    let roleBasedNav = null;
    const { user, setUser } = useContext(UserContext);



    if (!user) {

        roleBasedNav = <li>
            <Link to="/about">About</Link>
        </li>

        if (location.pathname === "/logIn") {
            accountLinks =
                <div className="account-container">
                    <Link to="/signUp">
                        <button className='accountBtn'>Sign Up</button>
                    </Link>
                </div>
        }
        else if (location.pathname === "/signUp") {
            accountLinks =
                <div className="account-container">
                    <Link to="/logIn">
                        <button className='accountBtn'>Log In</button>
                    </Link>
                </div>
        }
        else {
            accountLinks =
                <div className="account-container">
                    <Link to="/logIn">
                        <button className='accountBtn'>Log In</button>
                    </Link>
                    <Link to="/signUp">
                        <button className='accountBtn'>Sign Up</button>
                    </Link>
                </div>;

        }
    }
    else {

        if (location.pathname === '/profile') {
            accountLinks = null;
            if (user.role === 'customer' || user.role === 'delivery') {
                accountLinks =
                    <DropDown />

            }
        }
        else {
            accountLinks =
                <DropDown />
        }

        if (user.role == 'customer') {

            roleBasedNav = <>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/order">Order</Link>
                </li>
            </>;
        }
        else if (user.role === 'delivery') {
            roleBasedNav = <>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/ordersLive">Live Orders</Link>
                </li>
            </>;
        }
        else if (user.role === 'admin') {
            roleBasedNav = <>
                <li>
                    <Link to="/manageUsers">Users</Link>
                </li>
                <li>
                    <Link to="/manageDeliveries">Deliveries</Link>
                </li>
            </>
        }
    }
    return (
        <div className='navbar-container'>
            <ul className='navbar-left'>
                <li>
                    <i className="fa-solid fa-pizza-slice fa-2x"></i>
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/foodList">Menu</Link>
                </li>
                {roleBasedNav}
            </ul>
            <div className='navbar-right'>
                {accountLinks}
            </div>
        </div>
    );
}

export default Navbar;
