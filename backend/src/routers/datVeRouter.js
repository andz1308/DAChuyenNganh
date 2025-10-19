import express from 'express';
import datVeController from '../controllers/datVe.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createDatVeSchema } from '../validations/datVe.validation.js';

const router = express.Router();

router.post('/', validate(createDatVeSchema), datVeController.createDatVe);
router.get('/', datVeController.listDatVe);
router.get('/:id', datVeController.getDatVe);
router.put('/:id', datVeController.updateDatVe);
router.delete('/:id', datVeController.deleteDatVe);

export default router;
