import express from 'express';
import ctrl from '../controllers/nhaSanXuat.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createNhaSanXuatSchema, updateNhaSanXuatSchema } from '../validations/nhaSanXuat.validation.js';

const router = express.Router();

router.post('/', validate(createNhaSanXuatSchema), ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.put('/:id', validate(updateNhaSanXuatSchema), ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
