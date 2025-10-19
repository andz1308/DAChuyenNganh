import express from 'express';
import rapController from '../controllers/rap.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createRapSchema, updateRapSchema } from '../validations/rap.validation.js';

const router = express.Router();

router.post('/', validate(createRapSchema), rapController.createRap);
router.get('/', rapController.getAllRaps);
router.get('/:id', rapController.getRap);
router.put('/:id', validate(updateRapSchema), rapController.updateRap);
router.delete('/:id', rapController.deleteRap);

export default router;
