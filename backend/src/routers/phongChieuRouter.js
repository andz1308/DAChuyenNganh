import express from 'express';
import phongChieuController from '../controllers/phongChieu.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createPhongChieuSchema } from '../validations/phongChieu.validation.js';

const router = express.Router();

router.post('/', validate(createPhongChieuSchema), phongChieuController.createPhongChieu);
router.get('/', phongChieuController.listPhongChieu);

export default router;
