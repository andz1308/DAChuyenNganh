import { getModels } from '../models/index.js';
const { Ghe } = getModels();

const create = async (payload) => {
  return Ghe.create(payload);
};

const list = async (query = {}) => {
  return Ghe.findAll({ where: query });
};

const getById = async (id) => Ghe.findByPk(id);

const update = async (id, payload) => {
  const item = await Ghe.findByPk(id);
  if (!item) return null;
  await item.update(payload);
  return item;
};

const remove = async (id) => {
  const item = await Ghe.findByPk(id);
  if (!item) return false;
  await item.destroy();
  return true;
};

export default { create, list, getById, update, remove };
