import express from 'express';
import ctrl from '../controllers/loaiNgay.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createLoaiNgaySchema, updateLoaiNgaySchema } from '../validations/loaiNgay.validation.js';

const router = express.Router();

router.post('/', validate(createLoaiNgaySchema), ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.put('/:id', validate(updateLoaiNgaySchema), ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
