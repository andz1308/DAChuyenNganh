import { getModels } from '../models/index.js';

const create = async (payload) => { const { KhuyenMai } = getModels(); return KhuyenMai.create(payload); };
const list = async (query = {}) => { const { KhuyenMai } = getModels(); return KhuyenMai.findAll({ where: query }); };
const getById = async (id) => { const { KhuyenMai } = getModels(); return KhuyenMai.findByPk(id); };
const update = async (id, payload) => {
  const { KhuyenMai } = getModels();
  const k = await KhuyenMai.findByPk(id);
  if (!k) return null;
  await k.update(payload);
  return k;
};
const remove = async (id) => {
  const { KhuyenMai } = getModels();
  const k = await KhuyenMai.findByPk(id);
  if (!k) return false;
  await k.destroy();
  return true;
};

export default { create, list, getById, update, remove };
