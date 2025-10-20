import express from 'express';
import ctrl from '../controllers/donHangDoAn.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createDonHangDoAnSchema, updateDonHangDoAnSchema } from '../validations/donHangDoAn.validation.js';

const router = express.Router();

router.post('/', validate(createDonHangDoAnSchema), ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.put('/:id', validate(updateDonHangDoAnSchema), ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
