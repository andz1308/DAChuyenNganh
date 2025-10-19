import { getModels } from '../models/index.js';
const { User } = getModels();

const createStaff = async (payload) => {
  // TODO: implement create staff user (role STAFF)
};

const listStaff = async () => {
  // TODO: implement list staff users
};

export default { createStaff, listStaff };
