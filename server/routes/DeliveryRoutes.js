import express from 'express';
import { deliveryHisto, activeDel, markDeliv, deliver, deliveriesForAdmin, deleteDel, AllDeliveryMan, updDelivery } from '../Controllers/DeliveryController.js';


const router = express.Router();

router.post('/deliveryHistory', deliveryHisto);
router.post('/activeDelivery', activeDel);
router.put('/markDelivery', markDeliv);
router.post('/takeToDeliver', deliver);
router.get('/allDeliveries', deliveriesForAdmin);
router.get('/allDeliveryMen', AllDeliveryMan);
router.delete('/deleteDelivery', deleteDel);
router.put('/updateDelivery', updDelivery);

export default router;