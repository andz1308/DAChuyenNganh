import { getModels } from '../models/index.js';

const create = async (payload) => { const { DoAn } = getModels(); return DoAn.create(payload); };
const list = async (query = {}) => { const { DoAn } = getModels(); return DoAn.findAll({ where: query }); };
const getById = async (id) => { const { DoAn } = getModels(); return DoAn.findByPk(id); };
const update = async (id, payload) => {
  const { DoAn } = getModels();
  const d = await DoAn.findByPk(id);
  if (!d) return null;
  await d.update(payload);
  return d;
};
const remove = async (id) => {
  const { DoAn } = getModels();
  const d = await DoAn.findByPk(id);
  if (!d) return false;
  await d.destroy();
  return true;
};

export default { create, list, getById, update, remove };
