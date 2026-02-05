import { useState, useEffect } from "react";
import { UserContext } from "./Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { status } from "../api/auth.api";

//creating a userprovider "Provider" is needed 
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // const context = useContext(UserContext);

    // if (!context) {
    //     throw new Error("No context provided");
    // }

    useEffect(() => {
        const getUser = async () => {

            try {

                const userSaver = await status();
                console.log(userSaver);
                if (userSaver) {
                    setUser(userSaver.user);
                    setAuthenticated(userSaver.authenticated);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getUser();
    }, []);
    //givint the values to the children which is the entire app in 
    // main.jsx
    if (loading) {
        return <div className="loading-container">
            <FontAwesomeIcon className="loading" icon={faSpinner} />
        </div>;
    }
    return (
        <UserContext.Provider value={{ user, setUser, authenticated, setAuthenticated }}>
            {children}
        </UserContext.Provider>
    );

};