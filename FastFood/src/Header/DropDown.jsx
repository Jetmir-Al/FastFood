
import { useNavigate } from 'react-router-dom';
import './dropDown.css';
import { UserContext } from '../UserContext/Context';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { DropDownContext } from '../UserContext/Context';

export const DropDown = () => {

    const { dropDownVal, setDropDown } = useContext(DropDownContext);
    const { user } = useContext(UserContext);
    let dropDown = null;
    const navigate = useNavigate();
    const DropDownFunc = (dropDownBtnVal) => {
        navigate('/profile');
        setDropDown(dropDownBtnVal);
    }

    if (user.role === 'delivery') {
        dropDown = <div className='dropDown-Container'>
            <div className='hoverDropDown'>
                <FontAwesomeIcon className='dropDownIcon' icon={faBars} />
            </div>
            <div className='dropDown'>
                <button className='dropDownItem'
                    onClick={() => DropDownFunc('accInfo')}>
                    Profile
                </button>
                <button onClick={() => DropDownFunc('deliveryHistory')}
                    className='dropDownItem'>
                    Delivery History
                </button>
                <button onClick={() => DropDownFunc('activDelivery')}
                    className='dropDownItem'>
                    Active Delivery
                </button>
            </div>
        </div>
    }
    else if (user.role === 'customer') {
        dropDown = <div className='dropDown-Container'>
            <div className='hoverDropDown'>
                <FontAwesomeIcon className='dropDownIcon' icon={faBars} />
            </div>
            <div className='dropDown'>
                <button className='dropDownItem'
                    onClick={() => DropDownFunc('accInfo')}>
                    Profile
                </button>
                <button className='dropDownItem'
                    onClick={() => DropDownFunc('orderHisto')}>
                    Order History
                </button>
                <button className='dropDownItem'
                    onClick={() => DropDownFunc('activOrder')}>
                    Active Orders
                </button>
            </div>
        </div>
    }
    else if (user.role === 'admin') (
        dropDown = <div className='dropDown-Container'>
            <div className='hoverDropDown'>
                <FontAwesomeIcon className='dropDownIcon' icon={faBars} />
            </div>
            <div className='dropDown' id='dropDownAdmin'>
                <button className='dropDownItem' id='dropDownAdminItem'
                    onClick={() => DropDownFunc('accInfo')}>
                    Profile
                </button>

            </div>
        </div>
    )
    else {
        dropDown = null;
    }
    // if (user.role == 'delivery') {
    //     dropDown = <div className="sideBar-conatiner">
    //         <select id="dropDown" className='dropdown' name="dropDown" value={dropDownVal}
    //             onChange={(e) => setDropDown(e.target.value)}>
    //             <option value="accInfo">Account Info</option>
    //             <option value="deliveryHistory">Delivery history</option>
    //             <option value="activDelivery">Active delivery</option>
    //         </select>
    //     </div>
    // } else if (user.role == 'customer') {
    //     dropDown = <div className="dropdown-conatiner">
    //         <select id="dropDown" className='dropdown' name="dropDown"
    //             onChange={(e) => setDropDown(e.target.value)}>
    //             <option value="accInfo">
    //                 Account Info
    //             </option>
    //             <option value="orderHisto">Order history </option>
    //             <option value="activOrder">Active order</option>
    //         </select>
    //     </div>
    // }
    // else {
    //     dropDown = <div className="dropdown-conatiner">
    //         dropDown is here unless you want to change it to not be here anymore
    //     </div>
    // }



    return (
        <>
            {dropDown}
        </>
    );
}