import express from 'express';
import suatChieuController from '../controllers/suatChieu.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createSuatChieuSchema, updateSuatChieuSchema } from '../validations/suatChieu.validation.js';

const router = express.Router();

router.post('/', validate(createSuatChieuSchema), suatChieuController.createSuatChieu);
router.get('/', suatChieuController.listSuatChieu);
router.get('/:id', suatChieuController.getSuatChieu);
router.put('/:id', validate(updateSuatChieuSchema), suatChieuController.updateSuatChieu);
router.delete('/:id', suatChieuController.deleteSuatChieu);

export default router;
