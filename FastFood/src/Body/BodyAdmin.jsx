import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faListCheck, faUsersViewfinder } from '@fortawesome/free-solid-svg-icons';
import './bodyAdmin.css';

const BodyAdmin = () => {


    return (
        <div className="hero-NoAcc">
            <div className='hero-info'>
                <h1>The BEST Fast Food
                    place in your area!</h1>
                <Link to={"/manageUsers"}>
                    <button>Make our app better!</button>
                </Link>
            </div>
            <div className='heroImg-container'>
                <div className="manageShortCuts">
                    <Link className="shortCut"
                        to={'/foodList'}>
                        <FontAwesomeIcon className="shortCutIcon" icon={faPlus} />
                    </Link>
                    <h3>Add new Food Item</h3>
                </div>
                <div className="manageShortCuts">
                    <h3>Manage Deliveries</h3>
                    <Link className="shortCut"
                        to={'/manageDeliveries'}>
                        <FontAwesomeIcon className="shortCutIcon" icon={faListCheck} />
                    </Link>
                </div>
                <div className="manageShortCuts">
                    <Link className="shortCut"
                        to={'/manageUsers'}>
                        <FontAwesomeIcon className="shortCutIcon" icon={faUsersViewfinder} />
                    </Link>
                    <h3>View All Users</h3>
                </div>

            </div>
        </div>
    );
}

export default BodyAdmin;