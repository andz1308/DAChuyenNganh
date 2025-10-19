import express from 'express';
import rapController from '../controllers/rap.controller.js';

const router = express.Router();

router.post('/', async (req, res) => {
  // TODO: validate + call controller
  res.status(501).send({ message: 'Not implemented' });
});

router.get('/', async (req, res) => {
  res.status(501).send({ message: 'Not implemented' });
});

export default router;
