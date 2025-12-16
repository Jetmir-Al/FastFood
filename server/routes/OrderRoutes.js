import express from 'express';
import { ActOrds, OrderHistory, orderDetails, OrdersLive, newOrders } from '../Controllers/OrdersController.js';


const router = express.Router();

router.post('/activeOrders', ActOrds);
router.post('/orderHistory', OrderHistory);
router.post('/orderDetails', orderDetails);
router.get('/liveOrders', OrdersLive);
router.get('/top3Orders', newOrders);

export default router;