import express from 'express';
import { UptPsw, CancelOrd } from '../Controllers/UpdateController.js';

const router = express.Router();

router.put('/updatePsw', UptPsw);
router.put('/cancelOrd', CancelOrd);

export default router;