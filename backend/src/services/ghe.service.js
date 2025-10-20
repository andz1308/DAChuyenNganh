import { getModels } from '../models/index.js';

const create = async (payload) => {
  const { Ghe } = getModels();
  return Ghe.create(payload);
};

const list = async (query = {}) => {
  const { Ghe } = getModels();
  return Ghe.findAll({ where: query });
};

const getById = async (id) => { const { Ghe } = getModels(); return Ghe.findByPk(id); };

const update = async (id, payload) => {
  const { Ghe } = getModels();
  const item = await Ghe.findByPk(id);
  if (!item) return null;
  await item.update(payload);
  return item;
};

const remove = async (id) => {
  const { Ghe } = getModels();
  const item = await Ghe.findByPk(id);
  if (!item) return false;
  await item.destroy();
  return true;
};

export default { create, list, getById, update, remove };
