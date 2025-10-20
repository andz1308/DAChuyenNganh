import { getModels } from '../models/index.js';

const create = async (payload) => { const { SuatChieu } = getModels(); return SuatChieu.create(payload); };
const list = async (query = {}) => { const { SuatChieu } = getModels(); return SuatChieu.findAll({ where: query }); };
const getById = async (id) => { const { SuatChieu } = getModels(); return SuatChieu.findByPk(id); };
const update = async (id, payload) => {
  const { SuatChieu } = getModels();
  const s = await SuatChieu.findByPk(id);
  if (!s) return null;
  await s.update(payload);
  return s;
};
const remove = async (id) => {
  const { SuatChieu } = getModels();
  const s = await SuatChieu.findByPk(id);
  if (!s) return false;
  await s.destroy();
  return true;
};

export default { create, list, getById, update, remove };
