import { getModels } from '../models/index.js';
const { User, Role } = getModels();

const create = async (payload) => {
  // Assume payload contains role_id or will default to STAFF role
  if (!payload.role_id) {
    const staffRole = await Role.findOne({ where: { ten_role: 'STAFF' } });
    payload.role_id = staffRole ? staffRole.role_id : null;
  }
  return User.create(payload);
};

const list = async () => User.findAll({ where: { role_id: (await Role.findOne({ where: { ten_role: 'STAFF' } }))?.role_id } });

export default { create, list };
