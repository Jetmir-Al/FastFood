import { useContext, useEffect, useState } from "react";
import { toggleUpdateDelivery } from "../../../UserContext/AdminContext";
import axios from "axios";

const UpdDel = ({ delMan, cust, fName, orderTime, location, OrderID, DeliveryID }) => {
    const { setUpdToggle, AllDeliveries } = useContext(toggleUpdateDelivery);

    const [address, setAddress] = useState('');
    const [deliveryMan, setDeliveryMan] = useState('');
    const [status, setStatus] = useState('');
    const [selectValues, setSelectValues] = useState([]);

    const AllDeliveryMen = async () => {
        try {
            const res = await axios.get('http://localhost:8080/delivery/allDeliveryMen');
            setSelectValues(res.data);
        } catch (err) {
            console.log('Diqka shkoj keq', err);
        }
    }
    useEffect(() => {
        AllDeliveryMen();
    }, [])

    const UpdateDeliveryDB = async (event) => {
        event.preventDefault();
        const orderID = OrderID;
        const deliveryID = DeliveryID;
        const userID = deliveryMan;
        try {
            await axios.put('http://localhost:8080/delivery/updateDelivery', { deliveryID, userID, address, orderID, status })
            setUpdToggle(u => !u)
            AllDeliveries();
        } catch (err) {
            console.log("Diqka shkoj keq: " + err);
            if (err.response && (err.response.data.message === "Update psw failed")) {
                console.log("Update failed!")
            }
        }
    }

    return (
        <div className="updateUserContainer">
            <div className="userInfo">
                <h3> Current Info </h3>
                <div className="info">
                    <p><strong>Delivery Man:</strong> {delMan}</p>
                    <p><strong>Customer:</strong> {cust}</p>
                    <p><strong>Food Name:</strong> {fName}</p>
                    <p><strong>Time of order:</strong> {orderTime}</p>
                    <p><strong>Address:</strong> {location}</p>
                </div>
            </div>
            <form className="updateForm" onSubmit={UpdateDeliveryDB}>
                <select id="role" className='role' name="role" required
                    value={deliveryMan}
                    onChange={(e) => setDeliveryMan(e.target.value)}>
                    <option value="" disabled>Select Delivery Man</option>
                    {
                        selectValues.length == 0 ? null :
                            selectValues.map((res, index) => (
                                <option key={index} value={res.userID}>{res.name}</option>
                            ))
                    }
                </select>
                <label>
                    <input className='signUpInput' type="text" placeholder='New Address' required
                        onChange={(e) => setAddress(e.target.value)} />
                </label>
                <select className='role' name="role" required
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}>
                    <option value="" disabled>Select Status</option>
                    <option value="out_for_delivery">Out for delivery</option>
                    <option value="delivered">Delivered</option>
                </select>

                <div className='btn-conatiner'>
                    <button className='btn-login' type="submit">Submit</button>
                    <button className='btn-login'
                        onClick={() => setUpdToggle(u => !u)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default UpdDel;