import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../UserContext/Context";
import axios from "axios";
import './activDelivery.css';

const ActivDelivery = () => {
    const { user } = useContext(UserContext);
    const [deliveryDB, setDeliveryDB] = useState([]);

    const ActiveDeliveryDB = async () => {
        let userID = user.userID;
        // console.log(userID)
        const activeDelivery = await axios.post('http://localhost:8080/delivery/activeDelivery', { userID });
        setDeliveryDB(activeDelivery.data);
    }
    useEffect(() => {
        ActiveDeliveryDB();
    }, [deliveryDB]);

    const MarkDeliv = async (deliveryID, orderID) => {
        try {
            await axios.put("http://localhost:8080/delivery/markDelivery", { deliveryID, orderID });

        } catch (error) {
            if (err.response && (err.response.data.message === "Update failed")) {
                console.log("Something went wrong", error);

            }
        }
    }

    return (
        <div className='active-deliveries'>
            {
                deliveryDB.length == 0 ? (<div className="noInfo">
                    <h2> No active deliveries as of now from this user!</h2>
                </div>) :
                    deliveryDB.map((res, index) => (
                        <div key={index} className="activdelivery">
                            <img className='foodImgs' src={`http://localhost:8080/images/${res.foodImg}`} alt="gal" />
                            <h3>{res.foodName} / {res.quantity}</h3>
                            <div className="activInfo">
                                <p><strong>Address:</strong> {res.address}</p>
                                <p className="status"><strong>Status:</strong> {res.status == 'out_for_delivery' ? 'Out for delivery' : 'Pending'}</p>
                                <p><strong>Full Price:</strong> {res.fullPrice}€</p>
                                <p>{res.orderDate}</p>
                                <button
                                    onClick={() => MarkDeliv(res.deliveryID, res.orderID)}
                                >Mark as delivered!</button>
                            </div>
                        </div>

                    ))
            }
        </div>
    );
};

export default ActivDelivery;