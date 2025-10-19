import express from 'express';
import veController from '../controllers/ve.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import Joi from 'joi';

const router = express.Router();

const createVeSchema = Joi.object({
	ghe_id: Joi.number().integer().required(),
	Dat_Ve_id: Joi.number().integer().required(),
	suat_chieu_id: Joi.number().integer().required(),
	ma_qr_code: Joi.string().required(),
	trang_thai_ve: Joi.string().required(),
	gia_ve: Joi.number().precision(2).required(),
});

router.post('/', validate(createVeSchema), veController.createVe);
router.get('/', veController.listVes);
router.get('/:id', veController.getVe);
router.put('/:id', veController.updateVe);
router.delete('/:id', veController.deleteVe);

export default router;
