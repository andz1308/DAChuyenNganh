import { getModels } from '../models/index.js';

const create = (payload) => { const { DaoDien } = getModels(); return DaoDien.create(payload); };
const list = async (options = {}) => {
  const page = Math.max(parseInt(options.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(options.limit) || 10, 1), 100);
  const offset = (page - 1) * limit;
  const { DaoDien } = getModels();
  const { rows, count } = await DaoDien.findAndCountAll({ where: {}, limit, offset });
  return { rows, count, page, limit };
};
const getById = (id) => { const { DaoDien } = getModels(); return DaoDien.findByPk(id); };
const update = async (id, payload) => {
  const { DaoDien } = getModels();
  const item = await DaoDien.findByPk(id);
  if (!item) return null;
  await item.update(payload);
  return item;
};
const remove = async (id) => {
  const { DaoDien } = getModels();
  const item = await DaoDien.findByPk(id);
  if (!item) return false;
  await item.destroy();
  return true;
};
export default { create, list, getById, update, remove };
