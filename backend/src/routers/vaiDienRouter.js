import express from 'express';
import ctrl from '../controllers/vaiDien.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createVaiDienSchema, updateVaiDienSchema } from '../validations/vaiDien.validation.js';

const router = express.Router();

router.post('/', validate(createVaiDienSchema), ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.put('/:id', validate(updateVaiDienSchema), ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
