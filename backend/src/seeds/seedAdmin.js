import { getModels } from '../models/index.js';
import { hashPassword } from '../utils/bcrypt.util.js';
import { env } from '../config/environment.js';
import { ROLE } from '../constants/role.constant.js';

export const seedAdminUser = async () => {
    try {
        const { User } = getModels();
        const existing = await User.findOne({ where: { email: env.ADMIN_EMAIL } });

        if (existing) {
            console.log(`🟢 Admin user already exists with email: ${env.ADMIN_EMAIL}`);
            return;
        }

        const hashed = await hashPassword(env.ADMIN_PASSWORD);

        const adminUser = await User.create({
            fullName: 'Administrator',
            email: env.ADMIN_EMAIL,
            password: hashed,
            role: ROLE.ADMIN,
        });

        console.log(`✅ Admin user created with email: ${env.ADMIN_EMAIL}`);
    } catch (err) {
        console.error('Seed admin error:', err.message);
    }
};
