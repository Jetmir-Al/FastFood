import { UpdatePsw, CancelOrder } from "../database/database.js";

export const UptPsw = async (req, res) => {

    const { psw, userID } = req.body;

    try {
        const updatingPsw = await UpdatePsw(psw, userID);
        console.log("Update psw happened well!")
        res.status(201).json({ passwordHash: psw });
    } catch (err) {
        console.log("Diqka shkoi keq:", err);
        res.status(500).json({ message: "Update psw failed" });
    }
};

export const CancelOrd = async (req, res) => {
    const { orderID } = req.body;

    // console.log(orderID);

    try {
        const updateOrder = await CancelOrder(orderID);
        res.status(201).json(updateOrder);

    } catch (err) {
        console.log("Diqka shkoi keq:", err);
        res.status(500).json({ message: "Canceling order failed" });
    }
}