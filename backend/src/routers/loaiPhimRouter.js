import express from 'express';
import ctrl from '../controllers/loaiPhim.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createLoaiPhimSchema, updateLoaiPhimSchema } from '../validations/loaiPhim.validation.js';

const router = express.Router();

router.post('/', validate(createLoaiPhimSchema), ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.put('/:id', validate(updateLoaiPhimSchema), ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
