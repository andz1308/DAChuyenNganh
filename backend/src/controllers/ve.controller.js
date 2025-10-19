import { getModels } from '../models/index.js';
import veService from '../services/ve.service.js';

const createVe = async (req, res) => {
  try {
    const v = await veService.create(req.body);
    return res.status(201).json(v);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const listVes = async (req, res) => {
  try {
    const list = await veService.list();
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const getVe = async (req, res) => {
  try {
    const v = await veService.getById(req.params.id);
    if (!v) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json(v);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const updateVe = async (req, res) => {
  try {
    const v = await veService.update(req.params.id, req.body);
    if (!v) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json(v);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const deleteVe = async (req, res) => {
  try {
    const ok = await veService.remove(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json({ message: 'Xóa thành công' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

export default { createVe, listVes, getVe, updateVe, deleteVe };
