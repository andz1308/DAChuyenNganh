import { getModels } from '../models/index.js';
import khuyenMaiService from '../services/khuyenMai.service.js';

const create = async (req, res) => {
  try {
    const k = await khuyenMaiService.create(req.body);
    return res.status(201).json(k);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const list = async (req, res) => {
  try {
    const list = await khuyenMaiService.list();
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const getKhuyenMai = async (req, res) => {
  try {
    const k = await khuyenMaiService.getById(req.params.id);
    if (!k) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json(k);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const updateKhuyenMai = async (req, res) => {
  try {
    const k = await khuyenMaiService.update(req.params.id, req.body);
    if (!k) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json(k);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const deleteKhuyenMai = async (req, res) => {
  try {
    const ok = await khuyenMaiService.remove(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json({ message: 'Xóa thành công' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

export default { create, list, getKhuyenMai, updateKhuyenMai, deleteKhuyenMai };
