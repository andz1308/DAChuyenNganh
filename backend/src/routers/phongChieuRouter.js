import express from 'express';
import phongChieuController from '../controllers/phongChieu.controller.js';

const router = express.Router();

router.post('/', async (req, res) => res.status(501).send({ message: 'Not implemented' }));
router.get('/', async (req, res) => res.status(501).send({ message: 'Not implemented' }));

export default router;
