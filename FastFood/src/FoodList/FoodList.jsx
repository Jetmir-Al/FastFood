import { useState, useEffect, useContext } from "react";
import axios from "axios";
import './foodList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from "../UserContext/Context";


const FoodList = () => {

    const { user } = useContext(UserContext)
    const [foodImg, setFile] = useState();
    const [food, setFood] = useState([]);
    const [displayMenu, setDisplayMenu] = useState(true);
    const [foodName, setFoodName] = useState();
    const [foodDesc, setFoodDesc] = useState();
    const [price, setPrice] = useState();


    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }
    const handleUpload = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("foodName", foodName);
        formData.append("foodDesc", foodDesc);
        formData.append("price", price);
        formData.append("foodImg", foodImg);
        try {
            // try asking what the headers are for
            await axios.post('http://localhost:8080/food/addFoodItem', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            foodList();
            setDisplayMenu(true);
        } catch (error) {
            console.log("Diqka shkoj keq", error);
        }
    }


    const foodList = async () => {

        try {
            const foods = await axios.get('http://localhost:8080/food/foodList')
            setFood(foods.data);

        } catch (err) {
            console.log("Diqka shkoj keq: ", err);
        }
    }
    useEffect(() => {
        foodList();
    }, [])
    return (
        <div className="foodList-conatiner">
            {displayMenu ? <>
                <div className="foodListTitle">
                    <h1>Listat e ushqimeve</h1>
                    {
                        user &&
                            user.role === 'admin' ?
                            <button button className="addBtn"
                                onClick={() => setDisplayMenu(m => !m)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            : null
                    }
                </div>
                <div className="foodList">
                    {
                        food.map((food, index) => (

                            <div className="food" key={index}>
                                <img src={`http://localhost:8080/images/${food.foodImg}`} alt="ss" />
                                <p>{food.foodName}</p>
                                <p>Price: {food.price}€</p>
                            </div>
                        ))
                    }
                </div>
            </> :
                <>
                    <div className='foodItemHeader'>
                        <h2 className="header-title">Add a food item!</h2>
                    </div>
                    <form className="addFoodItem" onSubmit={handleUpload}>
                        <input type="text" placeholder="Enter food name:"
                            onChange={(e) => setFoodName(e.target.value)} />
                        <input type="text" placeholder="Enter food description:"
                            onChange={(e) => setFoodDesc(e.target.value)} />
                        <input type="number" placeholder="Enter price:"
                            onChange={(e) => setPrice(e.target.value)} />
                        <input type="file" onChange={handleFile} />
                        <div className="addFoodBtns">

                            <button className="btn-login"
                                type="submit">Upload</button>
                            <button className="btn-login"
                                onClick={() => setDisplayMenu(m => !m)}>Cancel</button>
                        </div>
                    </form>
                </>
            }
        </div >
    )
}

export default FoodList;