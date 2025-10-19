import express from 'express';
import phimController from '../controllers/phim.controller.js';

const router = express.Router();

router.post('/', async (req, res) => res.status(501).send({ message: 'Not implemented' }));
router.get('/', async (req, res) => res.status(501).send({ message: 'Not implemented' }));

export default router;
