import { getModels } from '../models/index.js';

const create = async (payload) => {
  const { LoaiPhim } = getModels();
  return LoaiPhim.create(payload);
};

const list = async (options = {}) => {
  const page = Math.max(parseInt(options.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(options.limit) || 10, 1), 100);
  const offset = (page - 1) * limit;
  const { LoaiPhim } = getModels();
  const { rows, count } = await LoaiPhim.findAndCountAll({ where: {}, limit, offset });
  return { rows, count, page, limit };
};

const getById = async (id) => { const { LoaiPhim } = getModels(); return LoaiPhim.findByPk(id); };

const update = async (id, payload) => {
  const { LoaiPhim } = getModels();
  const item = await LoaiPhim.findByPk(id);
  if (!item) return null;
  await item.update(payload);
  return item;
};

const remove = async (id) => {
  const { LoaiPhim } = getModels();
  const item = await LoaiPhim.findByPk(id);
  if (!item) return false;
  await item.destroy();
  return true;
};

export default { create, list, getById, update, remove };
