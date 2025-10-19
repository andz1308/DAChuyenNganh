import { hashPassword } from '../utils/bcrypt.util.js';
import { sendMail } from './mail.service.js';
import { generateRandomPassword } from '../utils/password.util.js';
import { getModels } from '../models/index.js';

export const adminService = {
  // ---------------- CREATE ----------------
  async createAccount({ email, password, role }) {
    const { User } = getModels();
    const existing = await User.findOne({ where: { email } });
    if (existing) throw { status: 400, message: 'Email đã tồn tại trong hệ thống' };

    let rawPassword = password;
    if (!rawPassword) {
      // nếu không nhập password thì generate ngẫu nhiên 6 ký tự
      rawPassword = generateRandomPassword(6);
    }

    const hashedPassword = await hashPassword(rawPassword);

    const newUser = await User.create({
      fullName: 'New User',
      email,
      role,
      password: hashedPassword,
      createdBy: 'ADMIN',
    });

    await sendMail(email, 'ACCOUNT_CREATED', { email, password: rawPassword });

    return {
      message: `Tài khoản đã được tạo và mật khẩu đã gửi tới ${email}`,
      userId: newUser.user_id || newUser.id,
    };
  },

  // ---------------- READ ----------------
  async getAllUsers() {
    const { User } = getModels();
    return User.findAll({ attributes: { exclude: ['password'] } });
  },

  async getUserById(id) {
    const { User } = getModels();
    return User.findByPk(id, { attributes: { exclude: ['password'] } });
  },

  // ---------------- UPDATE ----------------
  async updateUser(id, updateData) {
    const { User } = getModels();
    if (updateData.password) updateData.password = await hashPassword(updateData.password);
    const user = await User.findByPk(id);
    if (!user) throw { status: 404, message: 'User not found' };
    await user.update(updateData);
    return User.findByPk(id, { attributes: { exclude: ['password'] } });
  },

  // ---------------- DELETE ----------------
  async deleteUser(id) {
    const { User } = getModels();
    const user = await User.findByPk(id);
    if (!user) throw { status: 404, message: 'User not found' };
    await user.destroy();
    return { message: 'User deleted' };
  },
};
