import { useContext, useState } from "react";
import { UserContext } from "../../UserContext/Context";
import { useEffect } from "react";
import './deliveryHisto.css';
import axios from 'axios';

const DeliveryHistory = () => {
    const { user } = useContext(UserContext);
    const [delivHisto, setDelivHisto] = useState([]);

    const DeliveryHistory = async () => {
        let userID = user.userID;
        // console.log(userID)
        const deliveryHisto = await axios.post('http://localhost:8080/delivery/deliveryHistory', { userID });
        setDelivHisto(deliveryHisto.data);
        // console.log("Delivery history response:", deliveryHisto);

    }
    useEffect(() => {
        DeliveryHistory();
    }, []);

    return (
        <div className='delivery-history'>
            <div className="delivery">
                {
                    delivHisto.length == 0 ? (<div className="noInfo">
                        <h2>No history of deliveries from this user!</h2>
                    </div>)
                        : delivHisto.map((res, index) => (

                            <div key={index} className="card-Delivery">
                                <img className='foodImgs' src={`http://localhost:8080/images/${res.foodImg}`} alt="gal" />
                                <h3>{res.foodName} / {res.quantity}</h3>
                                <div className="info-card">
                                    <div className="card-p">

                                        <p><strong>Food:</strong> {res.foodDesc}</p>
                                        <p><strong>Address:</strong> {res.address}</p>
                                        <p><strong>Date:</strong> {res.orderDate}</p>
                                        <p className="card-status">{res.status}</p>

                                        <p><strong>Full Price:</strong> {res.fullPrice}€</p>
                                    </div>
                                </div>

                            </div>
                        ))

                }
            </div>
        </div >
    );
};

export default DeliveryHistory;
