import { getModels } from '../models/index.js';
import phimService from '../services/phim.service.js';

const createPhim = async (req, res) => {
  try {
    const p = await phimService.create(req.body);
    return res.status(201).json(p);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const listPhims = async (req, res) => {
  try {
    const list = await phimService.list();
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const getPhim = async (req, res) => {
  try {
    const p = await phimService.getById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json(p);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const updatePhim = async (req, res) => {
  try {
    const p = await phimService.update(req.params.id, req.body);
    if (!p) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json(p);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const deletePhim = async (req, res) => {
  try {
    const ok = await phimService.remove(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json({ message: 'Xóa thành công' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

export default { createPhim, listPhims, getPhim, updatePhim, deletePhim };
