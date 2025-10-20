import { getModels } from '../models/index.js';

const create = async (payload) => {
  const { Phim } = getModels();
  return Phim.create(payload);
};

const list = async (query = {}) => {
  const { Phim } = getModels();
  return Phim.findAll({ where: query });
};

const getById = async (id) => { const { Phim } = getModels(); return Phim.findByPk(id); };

const update = async (id, payload) => {
  const { Phim } = getModels();
  const p = await Phim.findByPk(id);
  if (!p) return null;
  await p.update(payload);
  return p;
};

const remove = async (id) => {
  const { Phim } = getModels();
  const p = await Phim.findByPk(id);
  if (!p) return false;
  await p.destroy();
  return true;
};

export default { create, list, getById, update, remove };
