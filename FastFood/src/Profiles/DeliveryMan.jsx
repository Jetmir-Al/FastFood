import { useContext } from 'react';
import './ProfileStyles/delivery.css';
import { DropDownContext } from '../UserContext/DropDownContext';
import AccInfo from './DeliveryManBackend/AccInfo.jsx';
import DeliveryHistory from './DeliveryManBackend/DeliveryHistory.jsx';
import ActivDelivery from './DeliveryManBackend/ActivDelivery.jsx';
export const DeliveryMan = () => {


    const { dropDownVal } = useContext(DropDownContext);
    let show;
    if (dropDownVal == 'accInfo') {
        show = <AccInfo />
    } else if (dropDownVal == 'deliveryHistory') {
        show = <DeliveryHistory />
    } else if (dropDownVal == 'activDelivery') {
        show = <ActivDelivery />
    }

    return (
        <div className='deliveryMan'>
            {show}

        </div>
    );
}