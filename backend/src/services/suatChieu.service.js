import { getModels } from '../models/index.js';
const { SuatChieu } = getModels();

const create = async (payload) => SuatChieu.create(payload);
const list = async (query = {}) => SuatChieu.findAll({ where: query });
const getById = async (id) => SuatChieu.findByPk(id);
const update = async (id, payload) => {
  const s = await SuatChieu.findByPk(id);
  if (!s) return null;
  await s.update(payload);
  return s;
};
const remove = async (id) => {
  const s = await SuatChieu.findByPk(id);
  if (!s) return false;
  await s.destroy();
  return true;
};

export default { create, list, getById, update, remove };
