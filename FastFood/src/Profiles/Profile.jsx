import { useContext } from "react";
import { UserContext } from "../UserContext/Context";
import { Customer } from "./Customer.jsx";
import { DeliveryMan } from "./DeliveryMan.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import './ProfileStyles/Profile.css';
import Admin from "./Admin.jsx";


const Profile = () => {
    const { user } = useContext(UserContext);
    //make sure this condition that uses a value from a context is below any react hook because the rules say to call hooks at the top level:
    //     Don’t call hooks inside loops, conditions, or nested functions.
    // They must run in the same order every time the component renders.
    if (!user) return <div className="loading-container">
        <FontAwesomeIcon className="loading" icon={faSpinner} />
    </div>;





    return (
        <div className="profile-container">

            {user.role == 'customer' ?
                <Customer /> : user.role === 'delivery' ? <DeliveryMan /> : <Admin />
            }

        </div>
    );
}

export default Profile;