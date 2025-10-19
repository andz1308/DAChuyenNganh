import express from 'express';
import seatHoldController from '../controllers/seatHold.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { createSeatHoldSchema } from '../validations/seatHold.validation.js';

const router = express.Router();

router.post('/', validate(createSeatHoldSchema), seatHoldController.createSeatHold);
router.get('/', seatHoldController.listSeatHolds);
router.get('/:id', seatHoldController.getSeatHold);
router.delete('/:id', seatHoldController.releaseSeatHold);

export default router;
