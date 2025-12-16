import express from 'express';
import { users, DeleteUser, updatedUser } from "../Controllers/UsersController.js";

const router = express.Router();

router.get('/viewUsers', users)
router.delete('/delUser', DeleteUser)
router.put('/updateUser', updatedUser)

export default router;
