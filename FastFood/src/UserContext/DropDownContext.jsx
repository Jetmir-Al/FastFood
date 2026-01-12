import { useState, useContext } from "react";
import { DropDownContext } from "./Context";

export const DropDownProvider = ({ children }) => {
    const [dropDownVal, setDropDown] = useState('accInfo');
    // const context = useContext(DropDownContext);

    // if (!context) {
    //     throw new Error("No context provided");
    // }
    return (
        <DropDownContext.Provider value={{ dropDownVal, setDropDown }}>
            {children}
        </DropDownContext.Provider>
    );

};