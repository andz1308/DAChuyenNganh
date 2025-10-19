// src/services/auth.service.js
import { toUserResponse } from "../mappers/user.mapper.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.util.js";
import { otpService } from "../services/otp.service.js";
import { sendMail } from "./mail.service.js";
import { jwtUtils } from "../utils/jwt.util.js";
import { MailType } from "../constants/mail.constant.js";
import { env } from "../config/environment.js";
import { refreshTokenService } from "./refresh-token.service.js";
import { getModels } from "../models/index.js";

export const authService = {
    async register({ fullName, email, password, otpCode }, ip, device) {
        const { User } = getModels();

        const existing = await User.findOne({ where: { email } });
        if (existing) throw { status: 400, message: "Email đã được sử dụng" };

        password = await hashPassword(password);

        if (!await otpService.verify(email, otpCode)) {
            throw { status: 400, message: "Mã OTP không hợp lệ" };
        }

        const user = await User.create({ fullName, email, password });

        await sendMail(email, MailType.REGISTER_SUCCESS, { fullName });

        const accessToken = jwtUtils.signAccessToken(user);
        const refreshToken = await refreshTokenService.generate(user, ip, device);

        return { user: toUserResponse(user), accessToken, refreshToken };
    },

    async login({ email, password }, ip, device) {
        const { User } = getModels();

        const user = await User.findOne({ where: { email } });
        if (!user) throw { status: 404, message: "Không tìm thấy người dùng" };

        if (!await comparePassword(password, user.password)) {
            throw { status: 401, message: "Sai mật khẩu" };
        }

        const accessToken = jwtUtils.signAccessToken(user);
        const refreshToken = await refreshTokenService.generate(user, ip, device);

        return { user: toUserResponse(user), accessToken, refreshToken };
    },

    async resetPassword({ email, otpCode, newPassword }, ip, device) {
        const { User, RefreshToken } = getModels();

        const user = await User.findOne({ where: { email } });
        if (!user) throw { status: 404, message: "Không tìm thấy người dùng" };

        if (!await otpService.verify(email, otpCode)) {
            throw { status: 400, message: "Mã OTP không hợp lệ" };
        }

        newPassword = await hashPassword(newPassword);
        await user.update({ password: newPassword });

        await RefreshToken.update(
            { revokedAt: new Date(), revokedByIp: ip },
            { where: { userId: user.id, revokedAt: null } }
        );

        const accessToken = jwtUtils.signAccessToken(user);
        const refreshToken = await refreshTokenService.generate(user, ip, device);

        return { accessToken, refreshToken };
    },

    async updatePassword(userId, currentPassword, newPassword) {
        const { User } = getModels();

        const user = await User.findByPk(userId);
        if (!user) throw { status: 404, message: "Không tìm thấy người dùng" };

        if (!await comparePassword(currentPassword, user.password)) {
            throw { status: 401, message: "Sai mật khẩu hiện tại" };
        }

        newPassword = await hashPassword(newPassword);
        await user.update({ password: newPassword });

        return { message: "Cập nhật mật khẩu thành công" };
    },

    async sendOtp(email, type) {
        const { User } = getModels();

        const otp = await otpService.generate(email);

        if (type === "RESET_PASSWORD") {
            const isExist = await User.findOne({ where: { email } });
            if (!isExist) throw { status: 404, message: "Không tìm thấy người dùng" };
        }

        if (type === "SIGN_UP") {
            const isExist = await User.findOne({ where: { email } });
            if (isExist) throw { status: 400, message: "Email đã được sử dụng" };
        }

        await sendMail(email, type, {
            otp,
            otpExpiresInMinutes: env.OTP_EXPIRE_MINUTES,
        });
    },

    async refreshToken(refreshToken, ip, device) {
        const decoded = await refreshTokenService.verify(refreshToken);

        const { User } = getModels();
        const user = await User.findByPk(decoded.userId);
        if (!user) throw { status: 404, message: "User không tồn tại" };

        const newAccessToken = jwtUtils.signAccessToken(user);
        const newRefreshToken = await refreshTokenService.rotate(
            refreshToken,
            user,
            ip,
            device
        );

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    },

    async logout(refreshToken, ip) {
        if (!refreshToken) throw { status: 400, message: "Thiếu refresh token" };

        await refreshTokenService.revoke(refreshToken, ip);
        return { message: "Đăng xuất thành công" };
    },
};
