import { getModels } from '../models/index.js';
const { Phim } = getModels();

const create = async (payload) => {
  return Phim.create(payload);
};

const list = async (query = {}) => {
  return Phim.findAll({ where: query });
};

const getById = async (id) => Phim.findByPk(id);

const update = async (id, payload) => {
  const p = await Phim.findByPk(id);
  if (!p) return null;
  await p.update(payload);
  return p;
};

const remove = async (id) => {
  const p = await Phim.findByPk(id);
  if (!p) return false;
  await p.destroy();
  return true;
};

export default { create, list, getById, update, remove };
