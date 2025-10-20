import express from 'express';
import ctrl from '../controllers/caChieu.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createCaChieuSchema, updateCaChieuSchema } from '../validations/caChieu.validation.js';

const router = express.Router();

router.post('/', validate(createCaChieuSchema), ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.put('/:id', validate(updateCaChieuSchema), ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
