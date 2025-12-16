import './liveOrder.css';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';

const LiveOrders = () => {
    const [order, setOrder] = useState([]);
    const { user } = useContext(UserContext);

    const liveOrder = async () => {
        try {
            const orders = await axios.get('http://localhost:8080/orders/liveOrders');
            setOrder(orders.data);

        } catch (err) {
            console.log("Diqka shkoj keq: ", err);
        }
    }
    useEffect(() => {
        liveOrder();
    }, [order]);
    async function takeToDeliver(orderID) {
        const deliveryManID = user.userID;
        try {
            const deliver = await axios.post('http://localhost:8080/delivery/takeToDeliver', { orderID, deliveryManID });

        } catch (error) {
            console.log("Diqka shkoj keq: ", err);
        }

    }
    return (
        <div className="liveOrders-container">
            <div className='usersHeader'>
                <h2 className="header-title">Live Orders</h2>
            </div>
            <div className='table-wrapper'>

                <table className='liveOrders'>
                    <thead>
                        <tr>

                            <th>Food Name</th>
                            <th>Address</th>
                            <th>Time</th>
                            <th>Full Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order.length === 0 ? <tr style={{ textAlign: 'center' }}>
                                <td colSpan={6}>No deliveries as of this moment!</td>
                            </tr> : order.map((res, index) => (
                                <tr className='liveOrder-row'
                                    key={index}>

                                    <td>{res.foodName} + {res.quantity}</td>
                                    <td>{res.address}</td>
                                    <td>{res.orderTime}</td>
                                    <td>{res.fullPrice}€</td>
                                    <td>{res.status.toUpperCase()}</td>
                                    <td>
                                        <button
                                            onClick={() => takeToDeliver(res.orderID)}
                                        >Deliver!</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LiveOrders;