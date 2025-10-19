import express from 'express';
import phimController from '../controllers/phim.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createPhimSchema, updatePhimSchema } from '../validations/phim.validation.js';

const router = express.Router();

router.post('/', validate(createPhimSchema), phimController.createPhim);
router.get('/', phimController.listPhims);
router.get('/:id', phimController.getPhim);
router.put('/:id', validate(updatePhimSchema), phimController.updatePhim);
router.delete('/:id', phimController.deletePhim);

export default router;
