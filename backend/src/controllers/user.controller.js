import { userService } from "../services/user.service.js";

// Lấy thông tin user dựa vào _id từ payload
export const getMe = async (req, res) => {
  try {
    const { userId } = req.payload;
    const user = await userService.getMe(userId);
    res.json({ message: "Lấy thông tin user thành công", data: user });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Lỗi server",
      error: error.error || null,
    });
  }
};

// Update thông tin user dựa vào _id
export const updateMe = async (req, res) => {
  try {
    const { userId } = req.payload;
    const updates = req.body;
    const user = await userService.updateMe(userId, updates);
    res.json({ message: "Cập nhật thành công", data: user });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Lỗi server",
      error: error.error || null,
    });
  }
};
