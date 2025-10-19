import { env } from '../config/environment.js';
import { getModels } from '../models/index.js';

export const otpService = {
    async generate(email) {
        const { Otp } = getModels();
        await Otp.destroy({ where: { email } });
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + env.OTP_EXPIRE_MINUTES * 60 * 1000);
        await Otp.create({ email, otp, expiresAt });
        return otp;
    },

    async verify(email, otpInput) {
        const { Otp } = getModels();
        const record = await Otp.findOne({ where: { email, otp: otpInput } });

        if (!record) return false;
        if (record.expiresAt < new Date()) return false;

        await Otp.destroy({ where: { id: record.id } }); // delete after use
        return true;
    }
};
