import express from 'express';
import ctrl from '../controllers/dienVien.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createDienVienSchema, updateDienVienSchema } from '../validations/dienVien.validation.js';

const router = express.Router();

router.post('/', validate(createDienVienSchema), ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.put('/:id', validate(updateDienVienSchema), ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
