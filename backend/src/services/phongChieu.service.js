import { getModels } from '../models/index.js';

const create = async (payload) => {
  const { PhongChieu } = getModels();
  const p = await PhongChieu.create(payload);
  return p;
};

const list = async () => {
  const { PhongChieu } = getModels();
  return PhongChieu.findAll();
};

export default { create, list };
