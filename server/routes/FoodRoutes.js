import express from 'express';
import { foodList, newFoodItem, upload } from '../Controllers/FoodController.js';

const router = express.Router();

router.get('/foodList', foodList);
router.post('/addFoodItem', upload.single('foodImg'), newFoodItem);

export default router;