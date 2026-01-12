import { useState, useEffect, useContext } from "react";
import { UserContext } from "./Context";

//creating a userprovider "Provider" is needed 
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // const context = useContext(UserContext);

    // if (!context) {
    //     throw new Error("No context provided");
    // }

    useEffect(() => {
        const userSaver = JSON.parse(localStorage.getItem('user'));
        if (userSaver) {
            setUser(userSaver);
        }
    }, []);
    //givint the values to the children which is the entire app in 
    // main.jsx
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );

};