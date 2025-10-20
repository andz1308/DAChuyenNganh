import { getModels } from '../models/index.js';

// Create a seat hold if seat is not already sold or held
const create = async (payload) => {
  const { SeatHold, Ve } = getModels();
  const existingHold = await SeatHold.findOne({ where: { suat_chieu_id: payload.suat_chieu_id, ghe_id: payload.ghe_id, status: 'ACTIVE' } });
  if (existingHold) throw new Error('Seat already held');

  // Check if ticket already sold for this seat and showtime
  const sold = await Ve.findOne({ where: { suat_chieu_id: payload.suat_chieu_id, ghe_id: payload.ghe_id } });
  if (sold) throw new Error('Seat already sold');

  const sh = await SeatHold.create({ ...payload, status: 'ACTIVE' });
  return sh;
};

const list = async (query = {}) => { const { SeatHold } = getModels(); return SeatHold.findAll({ where: query }); };

const getById = async (id) => { const { SeatHold } = getModels(); return SeatHold.findByPk(id); };

const release = async (id) => {
  const { SeatHold } = getModels();
  const sh = await SeatHold.findByPk(id);
  if (!sh) return null;
  sh.status = 'RELEASED';
  await sh.save();
  return sh;
};

export default { create, list, getById, release };
