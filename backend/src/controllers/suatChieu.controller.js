import { getModels } from '../models/index.js';
import suatChieuService from '../services/suatChieu.service.js';

const createSuatChieu = async (req, res) => {
  try {
    const s = await suatChieuService.create(req.body);
    return res.status(201).json(s);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const listSuatChieu = async (req, res) => {
  try {
    const list = await suatChieuService.list();
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const getSuatChieu = async (req, res) => {
  try {
    const s = await suatChieuService.getById(req.params.id);
    if (!s) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json(s);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const updateSuatChieu = async (req, res) => {
  try {
    const s = await suatChieuService.update(req.params.id, req.body);
    if (!s) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json(s);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const deleteSuatChieu = async (req, res) => {
  try {
    const ok = await suatChieuService.remove(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json({ message: 'Xóa thành công' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

export default { createSuatChieu, listSuatChieu, getSuatChieu, updateSuatChieu, deleteSuatChieu };
