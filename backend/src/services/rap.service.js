import { getModels } from '../models/index.js';
const { Rap } = getModels();

const createRap = async (payload) => {
  const rap = await Rap.create(payload);
  return rap;
};

const listRaps = async (query = {}) => {
  const raps = await Rap.findAll({ where: query });
  return raps;
};

const getById = async (id) => {
  return Rap.findByPk(id);
};

const updateRap = async (id, payload) => {
  const rap = await Rap.findByPk(id);
  if (!rap) return null;
  await rap.update(payload);
  return rap;
};

const deleteRap = async (id) => {
  const rap = await Rap.findByPk(id);
  if (!rap) return false;
  await rap.destroy();
  return true;
};

export default {
  createRap,
  listRaps,
  getById,
  updateRap,
  deleteRap,
};
