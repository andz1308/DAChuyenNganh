import { getModels } from '../models/index.js';
const { DoAn } = getModels();

const create = async (payload) => DoAn.create(payload);
const list = async (query = {}) => DoAn.findAll({ where: query });
const getById = async (id) => DoAn.findByPk(id);
const update = async (id, payload) => {
  const d = await DoAn.findByPk(id);
  if (!d) return null;
  await d.update(payload);
  return d;
};
const remove = async (id) => {
  const d = await DoAn.findByPk(id);
  if (!d) return false;
  await d.destroy();
  return true;
};

export default { create, list, getById, update, remove };
