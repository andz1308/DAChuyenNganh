import { getModels } from '../models/index.js';
const { Ve } = getModels();

const create = async (payload) => Ve.create(payload);
const list = async (query = {}) => Ve.findAll({ where: query });
const getById = async (id) => Ve.findByPk(id);
const update = async (id, payload) => {
  const v = await Ve.findByPk(id);
  if (!v) return null;
  await v.update(payload);
  return v;
};
const remove = async (id) => {
  const v = await Ve.findByPk(id);
  if (!v) return false;
  await v.destroy();
  return true;
};

export default { create, list, getById, update, remove };
