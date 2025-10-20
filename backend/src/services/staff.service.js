import { getModels } from '../models/index.js';

const create = async (payload) => {
  const { User, Role } = getModels();
  // Assume payload contains role_id or will default to STAFF role
  if (!payload.role_id) {
    const staffRole = await Role.findOne({ where: { ten_role: 'STAFF' } });
    payload.role_id = staffRole ? staffRole.role_id : null;
  }
  return User.create(payload);
};

const list = async () => {
  const { User, Role } = getModels();
  const staffRole = await Role.findOne({ where: { ten_role: 'STAFF' } });
  return User.findAll({ where: { role_id: staffRole?.role_id } });
};

export default { create, list };
