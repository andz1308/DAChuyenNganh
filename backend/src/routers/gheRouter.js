import express from 'express';
import gheController from '../controllers/ghe.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createGheSchema, updateGheSchema } from '../validations/ghe.validation.js';

const router = express.Router();

router.post('/', validate(createGheSchema), gheController.createGhe);
router.get('/', gheController.listGhes);
router.get('/:id', gheController.getGhe);
router.put('/:id', validate(updateGheSchema), gheController.updateGhe);
router.delete('/:id', gheController.deleteGhe);

export default router;
