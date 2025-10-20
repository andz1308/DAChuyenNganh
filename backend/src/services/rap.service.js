import { getModels } from '../models/index.js';

const createRap = async (payload) => {
  const { Rap } = getModels();
  const rap = await Rap.create(payload);
  return rap;
};

const listRaps = async (query = {}) => {
  const { Rap } = getModels();
  const raps = await Rap.findAll({ where: query });
  return raps;
};

const getById = async (id) => {
  const { Rap } = getModels();
  return Rap.findByPk(id);
};

const updateRap = async (id, payload) => {
  const { Rap } = getModels();
  const rap = await Rap.findByPk(id);
  if (!rap) return null;
  await rap.update(payload);
  return rap;
};

const deleteRap = async (id) => {
  const { Rap } = getModels();
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
