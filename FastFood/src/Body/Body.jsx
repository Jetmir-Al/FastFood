import { useContext, useEffect, useState } from 'react';
import './Body.css';
import NoAcc from './NoAcc';
import BodyCustomer from './BodyCustomer';
import BodyDelivery from './BodyDelivery';
import { UserContext } from '../UserContext/UserContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import BodyAdmin from './BodyAdmin';

function Body() {
    const { user } = useContext(UserContext);

    // put this below any react hook
    // put this on customer and delivery component
    // if (!user) return <div className="loading-container">
    //         <FontAwesomeIcon className="loading" icon={faSpinner} />
    //     </div>;

    let body = null;
    if (user) {

        if (user.role === 'customer') {
            body = <BodyCustomer />
        }
        else if (user.role === 'delivery') {
            body = <BodyDelivery />
        }
        else if (user.role === 'admin') {
            body = <BodyAdmin />
        }
    }
    else {
        body = <NoAcc />
    }
    return (
        <>
            <div className='hero-container'>
                {body}
            </div>

        </>
    );
}

export default Body;
