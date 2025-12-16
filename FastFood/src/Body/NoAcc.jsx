import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import './noAcc.css';

const NoAcc = () => {
    const [food, setFood] = useState([]);

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
        <div className="hero-NoAcc">
            <div className='hero-info'>
                <h1>The BEST Fast Food
                    place in your area!</h1>
                <Link to={"/logIn"}>
                    <button>Create account to order!</button>
                </Link>
            </div>
            <div className='heroImg-container'>
                <div className="img-container ">
                    <img src={`http://localhost:8080/images/cheeseBurger_1750699365178.png`} alt="hamburger Img" />
                    {
                        food.length > 0 && <div className="Img-info">
                            <h3>{food[0].foodName}</h3>
                            <p>{food[0].foodDesc}</p>
                        </div>
                    }
                </div>
                <div className="img-container ">
                    <img src={`http://localhost:8080/images/Veggie Pizza_1750699393834.png`} alt="Veggie pizza Img" />
                    {
                        food.length > 0 && <div className="Img-info">
                            <h3>{food[1].foodName}</h3>
                            <p>{food[1].foodDesc}</p>
                        </div>
                    }

                </div>
                <div className="img-container">
                    <img src={`http://localhost:8080/images/Chicken Wrap_1750785274194.png`} alt="Chicken Wrap img" />
                    {
                        food.length > 0 && <div className="Img-info">
                            <h3>{food[2].foodName}</h3>
                            <p>{food[2].foodDesc}</p>
                        </div>
                    }

                </div>

            </div>
        </div>
    );
}

export default NoAcc