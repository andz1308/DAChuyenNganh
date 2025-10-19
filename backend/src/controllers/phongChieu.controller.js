import { getModels } from '../models/index.js';
import phongChieuService from '../services/phongChieu.service.js';

const createPhongChieu = async (req, res) => {
  try {
    const p = await phongChieuService.create(req.body);
    return res.status(201).json(p);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const listPhongChieu = async (req, res) => {
  try {
    const list = await phongChieuService.list();
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

export default { createPhongChieu, listPhongChieu };
