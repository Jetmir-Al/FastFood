import { useEffect, useState } from 'react';
import './manageDel.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faSpinner, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { toggleUpdateDelivery } from '../../UserContext/AdminContext';
import UpdDel from './ManDelComp/UpdDel';


const ManageDel = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [updToggle, setUpdToggle] = useState(false)
    const [updDel, setUpdDel] = useState({});

    const AllDeliveries = async () => {
        try {
            const res = await axios.get('http://localhost:8080/delivery/allDeliveries');
            setDeliveries(res.data);
            // console.log(deliveries);

        } catch (err) {
            console.log('Diqka shkoj keq', err);
        }

    }

    useEffect(() => {
        AllDeliveries();
    }, [])

    const deleteDel = async (deliveryID) => {
        try {
            await axios.delete('http://localhost:8080/delivery/deleteDelivery', { data: { deliveryID } });
            AllDeliveries();
        } catch (err) {
            console.log("Diqka shkoj keq: " + err);
            if (err.response && (err.response.data.message === "Delete failed")) {
                console.log("Delete failed!");
            }
        }
    }

    const UpdateDelivery = (delMan, cust, fName, orderTime, address, orderID, deliveryID) => {
        setUpdToggle(u => !u);
        setUpdDel({
            delMan: delMan,
            cust: cust,
            fName: fName,
            orderTime: orderTime,
            address: address,
            orderID: orderID,
            deliveryID: deliveryID,
        });
    }

    return (
        <div className="deliveryAdmin-container">
            <div className='usersHeader'>
                <h2 className="header-title">Manage Deliveries</h2>
            </div>
            {updToggle ?
                <toggleUpdateDelivery.Provider value={{ setUpdToggle, AllDeliveries }}>
                    <UpdDel delMan={updDel.delMan} cust={updDel.cust} fName={updDel.fName} orderTime={updDel.orderTime} location={updDel.address} OrderID={updDel.orderID} DeliveryID={updDel.deliveryID} />
                </toggleUpdateDelivery.Provider>
                :
                <div className="table-wrapper">
                    <table className="usersTable">
                        {
                            deliveries.length === 0 ? (
                                <thead>
                                    <tr className="loading-container">
                                        <td colSpan={5} className="loading-cell">
                                            <FontAwesomeIcon className="loading" icon={faSpinner} /> Try another time!
                                        </td>
                                    </tr>
                                </thead>
                            ) :
                                <>
                                    <thead>
                                        <tr>
                                            <th>Delivery Man</th>
                                            <th>Customer</th>
                                            <th>Food Name</th>
                                            <th>FullPrice</th>
                                            <th>Order Date</th>
                                            <th>Order Time</th>
                                            <th>Address</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            deliveries.map((res, index) => (

                                                <tr key={index} className="deliveries-row">
                                                    <td>{res.deliveryMan}</td>
                                                    <td>{res.customer}</td>
                                                    <td>{res.foodName} / {res.quantity}</td>
                                                    <td>{res.fullPrice}€</td>
                                                    <td>{res.orderDate}</td>
                                                    <td>{res.orderTime}</td>
                                                    <td>{res.address}</td>
                                                    <td>{
                                                        res.status == 'OUT_FOR_DELIVERY' ? 'OUT FOR DELIVERY' : res.status
                                                    }</td>
                                                    <td className='tableBtns'>
                                                        {
                                                            res.status == 'DELIVERED' || res.status == 'CANCELED' ? null :
                                                                <button className="update-btn"
                                                                    onClick={() => UpdateDelivery(res.deliveryMan, res.customer, res.foodName, res.orderTime, res.address, res.orderID, res.deliveryID)}
                                                                >Update</button>
                                                        }


                                                        <button
                                                            onClick={() => deleteDel(res.deliveryID)}
                                                            className="delete-btn" >Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </>

                        }
                    </table>
                </div>
            }

        </div >
    )
}

export default ManageDel;