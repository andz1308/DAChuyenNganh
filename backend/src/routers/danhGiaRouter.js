import express from 'express';
import ctrl from '../controllers/danhGia.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createDanhGiaSchema, updateDanhGiaSchema } from '../validations/danhGia.validation.js';

const router = express.Router();

router.post('/', validate(createDanhGiaSchema), ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.put('/:id', validate(updateDanhGiaSchema), ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
