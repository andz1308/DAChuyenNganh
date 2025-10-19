import express from 'express';
import datVeController from '../controllers/datVe.controller.js';

const router = express.Router();

router.post('/', async (req, res) => res.status(501).send({ message: 'Not implemented' }));
router.get('/:id', async (req, res) => res.status(501).send({ message: 'Not implemented' }));

export default router;
