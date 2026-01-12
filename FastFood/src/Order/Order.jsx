import './order.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext/Context';

const Order = () => {

    const { user } = useContext(UserContext);
    const [submitOrder, setSubmitOrder] = useState(false);
    const [food, setFood] = useState([]);
    const [foodID, setFoodID] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [address, setAdress] = useState('');
    const foodList = async () => {
        try {
            const foods = await axios.get('http://localhost:8080/food/foodList');
            setFood(foods.data);

        } catch (err) {
            console.log("Diqka shkoj keq: ", err);
        }
    }
    useEffect(() => {
        foodList();
    }, []);

    const order = async (event) => {
        event.preventDefault();
        // console.log(foodID);
        const customerID = user.userID;
        try {
            await axios.post('http://localhost:8080/orders/orderDetails', { customerID, address, foodID, quantity });

            setSubmitOrder(s => !s);

        } catch (err) {
            console.log("Diqka shkoj keq: " + err);

        }
    }


    return (
        <>
            <div className='order-container'>
                <div className="orderHeader">
                    <h2>Order details:</h2>
                </div>
                <form className='order' onSubmit={order}>
                    <h3 className='submitOrder'
                        style={submitOrder ? { display: 'block' } : { display: 'none' }}
                    >Your order has been submited!</h3>
                    <label className='orderLbl'>
                        Your address here: <br />
                        <input type="text"
                            onChange={(e) => setAdress(e.target.value)} required />
                    </label>
                    <label className='orderLbl'>
                        Menu: <br />
                        <select id="orderItem" className='orderItem' name="orderItem" required
                            value={foodID}
                            onChange={(e) => setFoodID(e.target.value)}
                        >
                            <option value="" disabled>Select Food to Order:</option>
                            {
                                food.map((res, index) => (
                                    <option key={index} value={res.foodID}>{res.foodName} ~ {res.price}€</option>
                                ))
                            }
                        </select>
                    </label>
                    <label className='orderLbl'>
                        Quantity: <br />
                        <input type="number" onChange={(e) => setQuantity(e.target.value)} required />
                    </label>
                    <div className='btn-conatiner'>
                        <button className='btn-login' type="submit">Submit</button>
                        <Link to={"/"}>
                            <button className='btn-login' type='button'>
                                Cancel
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Order;