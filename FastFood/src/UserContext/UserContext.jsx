import { useState, useEffect, createContext } from "react";

//creating a context to call through the project
export const UserContext = createContext();

//creating a userprovider "Provider" is needed 
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);


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