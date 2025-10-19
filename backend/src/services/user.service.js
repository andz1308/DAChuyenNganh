import { getModels } from '../models/index.js';

export const userService = {
  getMe: async (id) => {
    const { User } = getModels();
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!user) throw { status: 404, message: 'User không tồn tại' };
    return user;
  },

  updateMe: async (id, updates) => {
    const { User } = getModels();
    const allowedUpdates = ["fullName", "email", "phoneNumber", "address"];
    const filteredUpdates = {};
    allowedUpdates.forEach((key) => { if (updates[key] !== undefined) filteredUpdates[key] = updates[key]; });

    const user = await User.findByPk(id);
    if (!user) throw { status: 404, message: 'User không tồn tại' };
    await user.update(filteredUpdates);
    return User.findByPk(id, { attributes: { exclude: ['password'] } });
  },
};