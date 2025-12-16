import { ActiveOrders, OrderHisto, Order, LiveOrders, top3Orders } from "../database/database.js";


export const newOrders = async (req, res) => {
    try {
        const newOrders = await top3Orders();
        res.status(200).json(newOrders);
    } catch (err) {
        console.log("Diqka shkoi keq:", err);
    }
}


export const OrdersLive = async (req, res) => {
    try {
        const orders = await LiveOrders();
        res.status(200).json(orders);
    }
    catch (err) {
        console.log("Diqka shkoi keq:", err);
    }
}

export const orderDetails = async (req, res) => {
    const { customerID, address, foodID, quantity } = req.body
    try {
        const orders = await Order(customerID, address, foodID, quantity);
        res.status(201).json(orders);
    } catch (err) {
        console.log("Diqka shkoi keq:", err);
    }
}

export const ActOrds = async (req, res) => {
    const { customerID } = req.body;
    try {
        const activeOrds = await ActiveOrders(customerID);
        res.status(201).json(activeOrds);
    }
    catch (err) {
        console.log("Diqka shkoi keq:", err);
    }
}

export const OrderHistory = async (req, res) => {
    const { customerID } = req.body;
    try {
        const Orders = await OrderHisto(customerID);
        res.status(201).json(Orders);
    }
    catch (err) {
        console.log("Diqka shkoi keq:", err);
    }
}