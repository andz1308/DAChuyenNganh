import { getModels } from '../models/index.js';
import datVeService from '../services/datVe.service.js';

const createDatVe = async (req, res) => {
  try {
    const d = await datVeService.create(req.body);
    return res.status(201).json(d);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const listDatVe = async (req, res) => {
  try {
    const list = await datVeService.list();
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const getDatVe = async (req, res) => {
  try {
    const d = await datVeService.getById(req.params.id);
    if (!d) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json(d);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const updateDatVe = async (req, res) => {
  try {
    const d = await datVeService.update(req.params.id, req.body);
    if (!d) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json(d);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const deleteDatVe = async (req, res) => {
  try {
    const ok = await datVeService.remove(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json({ message: 'Xóa thành công' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

export default { createDatVe, listDatVe, getDatVe, updateDatVe, deleteDatVe };
