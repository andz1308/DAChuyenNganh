import { getModels } from '../models/index.js';
import { hashPassword } from '../utils/bcrypt.util.js';
import { env } from '../config/environment.js';
import { ROLE } from '../constants/role.constant.js';

export const seedAdminUser = async () => {
    try {
        // Validate env
        if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) {
            throw new Error('Missing ADMIN_EMAIL or ADMIN_PASSWORD in environment');
        }

        // Ensure models are initialized
        const models = getModels();
        const User = models?.User;
        const Role = models?.Role;
        if (!User || !Role) {
            const keys = models ? Object.keys(models) : [];
            throw new Error(`Models not initialized properly. Available: [${keys.join(', ')}]`);
        }

        const existing = await User.findOne({ where: { email: env.ADMIN_EMAIL } });

        if (existing) {
            console.log(`🟢 Admin user already exists with email: ${env.ADMIN_EMAIL}`);
            return;
        }

        const hashed = await hashPassword(env.ADMIN_PASSWORD);

        // Ensure ADMIN role exists and get its id
        const [adminRole] = await Role.findOrCreate({
            where: { ten_role: ROLE.ADMIN },
            defaults: { ten_role: ROLE.ADMIN },
        });

        await User.create({
            ho_ten: 'Administrator',
            email: env.ADMIN_EMAIL,
            password: hashed,
            isActive: true,
            role_id: adminRole.role_id,
        });

        console.log(`✅ Admin user created with email: ${env.ADMIN_EMAIL}`);
    } catch (err) {
        console.error('Seed admin error:', err?.message || err);
    }
};
