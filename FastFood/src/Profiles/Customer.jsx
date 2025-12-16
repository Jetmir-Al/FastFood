import { useState, useContext } from 'react';
import './ProfileStyles/Customer.css';
import CustomerInfo from './CustomerBackend/CustomerInfo.jsx';
import OrderHistory from './CustomerBackend/OrderHistory.jsx';
import ActiveOrder from './CustomerBackend/ActivOrder.jsx';
import { DropDownContext } from '../UserContext/DropDownContext.jsx';

export const Customer = () => {
    const { dropDownVal } = useContext(DropDownContext);
    let show = null
    if (dropDownVal == 'accInfo') {
        show = <CustomerInfo />
    } else if (dropDownVal == 'orderHisto') {
        show = <OrderHistory />
    } else if (dropDownVal == 'activOrder') {
        show = <ActiveOrder />
    }
    return (
        <div className='customer-Container'>

            {show}
        </div>

    );
}