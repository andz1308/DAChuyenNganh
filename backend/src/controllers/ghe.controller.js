import { getModels } from '../models/index.js';
import gheService from '../services/ghe.service.js';

const createGhe = async (req, res) => {
  try {
    const g = await gheService.create(req.body);
    return res.status(201).json(g);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const listGhes = async (req, res) => {
  try {
    const list = await gheService.list();
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const getGhe = async (req, res) => {
  try {
    const g = await gheService.getById(req.params.id);
    if (!g) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json(g);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const updateGhe = async (req, res) => {
  try {
    const g = await gheService.update(req.params.id, req.body);
    if (!g) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json(g);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const deleteGhe = async (req, res) => {
  try {
    const ok = await gheService.remove(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json({ message: 'Xóa thành công' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

export default { createGhe, listGhes, getGhe, updateGhe, deleteGhe };
