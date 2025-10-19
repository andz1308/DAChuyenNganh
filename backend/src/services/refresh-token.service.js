import { getModels } from '../models/index.js';
import { jwtUtils } from "../utils/jwt.util.js";
import { sha256 } from "../utils/crypto.util.js"; // sha256 helper
import { Op } from 'sequelize';

export const refreshTokenService = {
    async generate(user, createdByIp, device) {
        // Sinh JWT refresh token
        const refreshToken = jwtUtils.signRefreshToken(user);

        // Lưu hash của token vào DB
        const decoded = jwtUtils.verifyRefreshToken(refreshToken);
        const tokenHash = sha256(refreshToken);

        // Lưu vào DB
        const { RefreshToken } = getModels();
        await RefreshToken.create({
            userId: user.user_id || user.id || user._id,
            tokenHash,
            expiresAt: new Date(decoded.exp * 1000), // exp trong JWT là seconds
            createdByIp,
            device,
        });

        // trả JWT plaintext cho FE
        return refreshToken; 
    },

    async verify(refreshToken) {
        // Verify JWT và kiểm tra trong DB
        const decoded = jwtUtils.verifyRefreshToken(refreshToken);
        const tokenHash = sha256(refreshToken);

        // Tìm trong DB
        const { RefreshToken } = getModels();
        const stored = await RefreshToken.findOne({ where: {
            tokenHash,
            revokedAt: null,
            expiresAt: { [Op.gt]: new Date() }
        }});

        // Nếu không tìm thấy hoặc đã bị thu hồi
        if (!stored) {
            throw { status: 401, message: "Refresh token không hợp lệ hoặc đã bị thu hồi" };
        }

        // Trả về thông tin user từ token
        return decoded;
    },

    async rotate(oldRefreshToken, user, createdByIp, device) {
        // Tìm token cũ trong DB
        const { RefreshToken } = getModels();
        const oldHash = sha256(oldRefreshToken);
        const oldTokenDoc = await RefreshToken.findOne({ where: {
            userId: user.user_id || user.id || user._id,
            tokenHash: oldHash,
            revokedAt: null,
        }});

        // Nếu không tìm thấy hoặc đã bị thu hồi
        if (!oldTokenDoc) {
            throw { status: 401, message: "Refresh token không hợp lệ" };
        }

        // Sinh JWT mới
        const newRefreshToken = jwtUtils.signRefreshToken(user);

        // Lưu hash của token mới vào DB
        const decodedNew = jwtUtils.verifyRefreshToken(newRefreshToken);
        const newHash = sha256(newRefreshToken);

        // Revoke token cũ
    await oldTokenDoc.update({ revokedAt: new Date(), replacedByTokenHash: newHash });

        // Lưu token mới
        await RefreshToken.create({
            userId: user.user_id || user.id || user._id,
            tokenHash: newHash,
            expiresAt: new Date(decodedNew.exp * 1000),
            createdByIp,
            device,
        });

        // Trả về token mới
        return newRefreshToken; 
    },

    async revoke(refreshToken, ip) {
        // Tìm token trong DB và đánh dấu thu hồi
    const { RefreshToken } = getModels();
    const tokenHash = sha256(refreshToken);
    const tokenDoc = await RefreshToken.findOne({ where: { tokenHash } });

        // Nếu tìm thấy và chưa bị thu hồi, thì thu hồi
        if (tokenDoc) {
            await tokenDoc.update({ revokedAt: new Date(), revokedByIp: ip });
        }
    },
};

// Sử dụng trong auth.Service.js
// import { refreshTokenService } from "./refresh-token.service.js";
// const refreshToken = await refreshTokenService.generate(user, ip, device);
// const decoded = await refreshTokenService.verify(refreshToken);
// const newRefreshToken = await refreshTokenService.rotate(oldRefreshToken, user, ip, device);
// await refreshTokenService.revoke(refreshToken, ip);
