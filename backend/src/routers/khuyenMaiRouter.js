import express from 'express';
import khuyenMaiController from '../controllers/khuyenMai.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createKhuyenMaiSchema, updateKhuyenMaiSchema } from '../validations/khuyenMai.validation.js';

const router = express.Router();

router.post('/', validate(createKhuyenMaiSchema), khuyenMaiController.create);
router.get('/', khuyenMaiController.list);
router.get('/:id', khuyenMaiController.getKhuyenMai);
router.put('/:id', validate(updateKhuyenMaiSchema), khuyenMaiController.updateKhuyenMai);
router.delete('/:id', khuyenMaiController.deleteKhuyenMai);

export default router;
