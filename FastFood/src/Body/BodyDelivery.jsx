import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './bodyDelivery.css';

const BodyDelivery = () => {

    const [topOrders, setTopOrders] = useState([]);
    const top3Orders = async () => {
        try {
            const newOrders = await axios.get('http://localhost:8080/orders/top3Orders');
            setTopOrders(newOrders.data);
        } catch (err) {
            console.log("Diqka shkoj keq: ", err);
        }
    }

    useEffect(() => {
        top3Orders();
    }, [])
    return (
        <div className="hero-NoAcc">
            <div className='hero-info'>
                <h1>The BEST Fast Food
                    place in your area!</h1>
                <Link to={"/ordersLive"}>
                    <button>Ready to deliver?</button>
                </Link>
            </div>
            <div className='heroImg-container'>
                {
                    topOrders.length === 0 ? (
                        <h2 className="noOrders">No new orders as of currently!</h2>
                    )
                        : topOrders.map((res, index) => (
                            <div className="img-container" key={index}>
                                <div className="Img-info">
                                    <h3>{res.foodName} + {res.quantity}</h3>
                                    <p>Time: {res.orderTime}</p>
                                    <p>Adress: {res.address}</p>
                                </div>
                                <img src={`http://localhost:8080/images/${res.foodImg}`} alt="ss" />
                            </div>
                        ))
                }

            </div>
        </div>
    );
}

export default BodyDelivery;