import express from 'express';
import ctrl from '../controllers/loaiGhe.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createLoaiGheSchema, updateLoaiGheSchema } from '../validations/loaiGhe.validation.js';

const router = express.Router();

router.post('/', validate(createLoaiGheSchema), ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.put('/:id', validate(updateLoaiGheSchema), ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
