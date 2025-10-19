import { authService } from "../services/auth.service.js";

const login = async (req, res) => {
    try {

        const ip = req.clientIp;        // đã parse sẵn
        const device = req.device;      // đã parse sẵn

        const { user, accessToken, refreshToken } = await authService.login(req.body, ip, device);

        return res.json({
            message: "Đăng nhập thành công",
            data: user,
            accessToken,
            refreshToken
        });
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message || "Lỗi server" });
    }
};

const register = async (req, res) => {
    try {
        const ip = req.clientIp;        // đã parse sẵn
        const device = req.device;      // đã parse sẵn
        const { user, accessToken, refreshToken } = await authService.register(req.body, ip, device);


        res.status(201).json({
            message: "Đăng ký thành công",
            data: user,
            accessToken,
            refreshToken
        });
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message || "Lỗi server" });
    }
};

const resetPassword = async (req, res) => {
    try {
        const ip = req.clientIp;        // đã parse sẵn
        const device = req.device;      // đã parse sẵn

        const { user, accessToken, refreshToken } = await authService.resetPassword(req.body, ip, device);

        // Generated token

        res.status(201).json({
            message: "Thay đổi mật khẩu thành công",
            data: user,
            accessToken,
            refreshToken
        });
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message || "Lỗi server" });
    }
};

const updatePassword = async (req, res) => {
    try {   
        // Lấy currentPassword và newPassword từ body
        const { currentPassword, newPassword } = req.body;
        // Lấy userId từ payload (nếu có) hoặc từ req.user (nếu có middleware xác thực)
        const userId = req.payload?.userId || req.user?._id; 

        if (!userId) {
            return res.status(401).json({ message: "Không xác định được người dùng" });
        }

        await authService.updatePassword(userId, currentPassword, newPassword);

        res.status(200).json({message: "Đổi mật khẩu thành công",});
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message || "Lỗi server" });   
    }
}

const refreshToken = async (req, res) => {
    try {
        const ip = req.clientIp;        // đã parse sẵn
        const device = req.device;      // đã parse sẵn
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ message: "Thiếu refresh token" });
        }

        const result = await authService.refreshToken(refreshToken, ip, device);
        res.json(result);
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message || "Lỗi server" });
    }
};


const sendOtp = async (req, res) => {
    const { email } = req.body;
    const { type } = req.query;
    try {
        await authService.sendOtp(email, type);
        res.json({ message: 'OTP đã được gửi về email' });
    } catch (err) {
        console.error(err);
        res.status(err.status).json({ message: err.message || 'Lỗi server' });
    }
};

const logout = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ message: "Thiếu refresh token" });
    }
    try {
        const ip = req.clientIp;
        const result = await authService.logout(refreshToken, ip);
        res.json(result);
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message || "Lỗi server" });
    }
};

export { login, register, resetPassword, refreshToken, sendOtp, logout, updatePassword };

