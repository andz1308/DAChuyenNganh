import { getModels } from '../models/index.js';
const { PhongChieu } = getModels();

const create = async (payload) => {
  const p = await PhongChieu.create(payload);
  return p;
};

const list = async () => {
  return PhongChieu.findAll();
};

export default { create, list };
