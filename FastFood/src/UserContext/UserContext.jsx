import { useState, useEffect } from "react";
import { UserContext } from "./Context";
import axios from "axios";

//creating a userprovider "Provider" is needed 
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    // const context = useContext(UserContext);

    // if (!context) {
    //     throw new Error("No context provided");
    // }

    useEffect(() => {
        const getUser = async () => {

            try {

                const userSaver = await axios.get('http://localhost:8080/status', { withCredentials: true });
                console.log(userSaver);
                if (userSaver) {
                    setUser(userSaver.data.user);
                    setAuthenticated(userSaver.data.authenticated);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    }, []);
    //givint the values to the children which is the entire app in 
    // main.jsx
    return (
        <UserContext.Provider value={{ user, setUser, authenticated, setAuthenticated }}>
            {children}
        </UserContext.Provider>
    );

};