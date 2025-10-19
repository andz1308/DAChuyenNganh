import express from 'express';
import doAnController from '../controllers/doAn.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createDoAnSchema, updateDoAnSchema } from '../validations/doAn.validation.js';

const router = express.Router();

router.post('/', validate(createDoAnSchema), doAnController.create);
router.get('/', doAnController.list);
router.get('/:id', doAnController.getDoAn);
router.put('/:id', validate(updateDoAnSchema), doAnController.updateDoAn);
router.delete('/:id', doAnController.deleteDoAn);

export default router;
