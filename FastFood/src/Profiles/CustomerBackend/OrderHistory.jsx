import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext/Context";
import axios from 'axios';
import './orderHisto.css';


const OrderHistory = () => {

    const { user } = useContext(UserContext);
    const [orderHistory, setOrderHistory] = useState([]);

    const orderHisto = async () => {
        const customerID = user.userID;
        try {
            const res = await axios.post('http://localhost:8080/orders/orderHistory', { customerID });
            setOrderHistory(res.data);
        } catch (err) {
            console.log("Diqka shkoj keq: ", err);
        }
    }

    useEffect(() => {
        orderHisto();
    }, []);

    return (
        <div className="orderHistory">
            {
                orderHistory.length == 0 ? (
                    <div className="noInfo">
                        <h2> No order history as of now from this user!</h2>
                    </div>
                ) : orderHistory.map((res, index) => (
                    <div key={index} className="card-Order">
                        <img className='foodImgs' src={`http://localhost:8080/images/${res.foodImg}`} alt="gal" />
                        <div className="info-card">
                            <h3>{res.foodName} / {res.quantity}</h3>
                            <div className="card-p">

                                <p><strong>Food:</strong> {res.foodDesc}</p>
                                <p><strong>Address:</strong> {res.address}</p>
                                <p><strong>Time:</strong> {res.orderTime} ~ {res.orderDate}</p>
                                <p className="card-OrderStatus">{res.status.toUpperCase()}</p>
                                <p><strong>Full Price:</strong> {res.fullPrice}€</p>
                            </div>

                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default OrderHistory;