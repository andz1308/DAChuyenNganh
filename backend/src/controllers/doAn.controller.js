import { getModels } from '../models/index.js';
import doAnService from '../services/doAn.service.js';

const create = async (req, res) => {
  try {
    const d = await doAnService.create(req.body);
    return res.status(201).json(d);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const list = async (req, res) => {
  try {
    const list = await doAnService.list();
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const getDoAn = async (req, res) => {
  try {
    const d = await doAnService.getById(req.params.id);
    if (!d) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json(d);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const updateDoAn = async (req, res) => {
  try {
    const d = await doAnService.update(req.params.id, req.body);
    if (!d) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json(d);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const deleteDoAn = async (req, res) => {
  try {
    const ok = await doAnService.remove(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json({ message: 'Xóa thành công' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

export default { create, list, getDoAn, updateDoAn, deleteDoAn };
