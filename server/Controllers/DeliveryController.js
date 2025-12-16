import { DeliveryHistory, ActiveDelivery, markAsDelivered, takeToDeliver, AllDeliveries, deleteDelivery, deliveryMans, updateDelivery } from "../database/database.js";


export const updDelivery = async (req, res) => {
    const { deliveryID, userID, address, orderID, status } = req.body;
    try {
        await updateDelivery(deliveryID, userID, address, orderID, status);
        res.status(204).json();
    } catch (err) {
        console.log("Diqka shkoi keq:", err);
    }
}

export const AllDeliveryMan = async (req, res) => {
    try {
        const delivery = await deliveryMans();
        return res.status(200).json(delivery);

    } catch (err) {
        console.log("Diqka shkoi keq:", err);
    }
}

export const deleteDel = async (req, res) => {
    const { deliveryID } = req.body;
    try {
        await deleteDelivery(deliveryID);
        return res.status(204).send();
    } catch (err) {
        console.log("Diqka shkoi keq:", err);
        res.status(500).json({ message: "Delete failed" });

    }
}

export const deliveriesForAdmin = async (req, res) => {
    try {
        const deliveries = await AllDeliveries();
        res.status(200).json(deliveries);
    } catch (err) {
        console.log("Diqka shkoi keq:", err);
    }
}

export const deliver = async (req, res) => {
    const { orderID, deliveryManID } = req.body;
    try {
        const newDelivery = await takeToDeliver(orderID, deliveryManID);
        res.status(201).json(newDelivery);
    } catch (err) {
        console.log("Diqka shkoi keq:", err);
    }
}

export const markDeliv = async (req, res) => {
    const { deliveryID, orderID } = req.body;
    try {
        const mark = await markAsDelivered(deliveryID, orderID);
        res.status(204).json(mark);
    } catch (err) {
        console.log("Diqka shkoi keq:", err);
    }
}


export const deliveryHisto = async (req, res) => {
    const { userID } = req.body;
    try {
        // console.log(userID)
        const delivery = await DeliveryHistory(userID);
        res.status(201).json(delivery);
    } catch (err) {
        console.log("Diqka shkoi keq:", err);
    }
};

export const activeDel = async (req, res) => {
    const { userID } = req.body;
    try {
        // console.log(userID)
        const activeDelivery = await ActiveDelivery(userID);
        res.status(201).json(activeDelivery);
    } catch (err) {
        console.log("Diqka shkoi keq:", err);
    }
}