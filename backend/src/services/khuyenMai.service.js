import { getModels } from '../models/index.js';
const { KhuyenMai } = getModels();

const create = async (payload) => KhuyenMai.create(payload);
const list = async (query = {}) => KhuyenMai.findAll({ where: query });
const getById = async (id) => KhuyenMai.findByPk(id);
const update = async (id, payload) => {
  const k = await KhuyenMai.findByPk(id);
  if (!k) return null;
  await k.update(payload);
  return k;
};
const remove = async (id) => {
  const k = await KhuyenMai.findByPk(id);
  if (!k) return false;
  await k.destroy();
  return true;
};

export default { create, list, getById, update, remove };
