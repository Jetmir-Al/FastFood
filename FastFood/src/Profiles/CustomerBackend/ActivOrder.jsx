import './activOrders.css';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext/UserContext';

const ActiveOrder = () => {

    const { user } = useContext(UserContext);
    const [activeOrders, setActiveOrders] = useState([]);

    const activOrders = async () => {
        const customerID = user.userID;

        try {
            const res = await axios.post('http://localhost:8080/orders/activeOrders', { customerID });
            setActiveOrders(res.data);
            // console.log(res.data);

        } catch (err) {
            console.log("Diqka shkoj keq: ", err);
        }
    }

    useEffect(() => {
        activOrders();
    }, [activeOrders]);

    const cancelOrder = async (orderID) => {
        // console.log(orderID);
        try {
            await axios.put('http://localhost:8080/update/cancelOrd', { orderID });


        } catch (err) {
            console.log("Diqka shkoj keq: " + err);
            if (err.response && (err.response.data.message === "Canceling order failed")) {
                console.log("Cancel failed!")
            }
        }
    }

    return (
        <div className='activeOrders'>
            {activeOrders.length == 0 ? (<div className="noInfo">
                <h2> No active orders as of now from this user!</h2>
            </div>) :
                activeOrders.map((res, index) => (
                    <div key={index} className="activdelivery">
                        <img className='foodImgs' src={`http://localhost:8080/images/${res.foodImg}`} alt="gal" />
                        <h3>{res.foodName} / {res.quantity}</h3>
                        <div className="activInfo">
                            <p><strong>Address:</strong> {res.address}</p>
                            <p className="status"><strong>Status:</strong> {res.status == 'out_for_delivery' ? 'Out for delivery' : 'Pending'}</p>
                            <p><strong>Full Price:</strong> {res.fullPrice}€</p>
                            <p><strong>Date:</strong> {res.orderDate}</p>
                            <button onClick={() => cancelOrder(res.orderID)}>Cancel Order!</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ActiveOrder;