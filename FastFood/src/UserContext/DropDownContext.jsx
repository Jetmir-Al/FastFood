import { createContext, useState } from "react";

export const DropDownContext = createContext();

export const DropDownProvider = ({ children }) => {
    const [dropDownVal, setDropDown] = useState('accInfo');

    return (
        <DropDownContext.Provider value={{ dropDownVal, setDropDown }}>
            {children}
        </DropDownContext.Provider>
    );

};