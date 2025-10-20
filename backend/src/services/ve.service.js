import { getModels } from '../models/index.js';

const create = async (payload) => { const { Ve } = getModels(); return Ve.create(payload); };
const list = async (query = {}) => { const { Ve } = getModels(); return Ve.findAll({ where: query }); };
const getById = async (id) => { const { Ve } = getModels(); return Ve.findByPk(id); };
const update = async (id, payload) => {
  const { Ve } = getModels();
  const v = await Ve.findByPk(id);
  if (!v) return null;
  await v.update(payload);
  return v;
};
const remove = async (id) => {
  const { Ve } = getModels();
  const v = await Ve.findByPk(id);
  if (!v) return false;
  await v.destroy();
  return true;
};

export default { create, list, getById, update, remove };
