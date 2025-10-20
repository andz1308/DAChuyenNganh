import express from 'express';
import ctrl from '../controllers/daoDien.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createDaoDienSchema, updateDaoDienSchema } from '../validations/daoDien.validation.js';

const router = express.Router();

router.post('/', validate(createDaoDienSchema), ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.put('/:id', validate(updateDaoDienSchema), ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
