import express from 'express';
import staffController from '../controllers/staff.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { createStaffSchema } from '../validations/staff.validation.js';
import { toStaffDto, toStaffListDto } from '../mappers/staff.mapper.js';

const router = express.Router();

router.post('/', validate(createStaffSchema), async (req, res) => {
	const created = await staffController.createStaff(req, res);
	// controller already sends response; do not double-send here
});

router.get('/', async (req, res) => {
	const result = await staffController.listStaff(req, res);
	// controller sends response
});

export default router;
