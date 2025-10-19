import { getModels } from '../models/index.js';
import rapService from '../services/rap.service.js';

const createRap = async (req, res) => {
  try {
    const rap = await rapService.createRap(req.body);
    return res.status(201).json(rap);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const getAllRaps = async (req, res) => {
  try {
    const raps = await rapService.listRaps();
    return res.json(raps);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const getRap = async (req, res) => {
  try {
    const rap = await rapService.getById(req.params.id);
    if (!rap) return res.status(404).json({ message: 'Không tìm thấy rạp' });
    return res.json(rap);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const updateRap = async (req, res) => {
  try {
    const rap = await rapService.updateRap(req.params.id, req.body);
    if (!rap) return res.status(404).json({ message: 'Không tìm thấy rạp' });
    return res.json(rap);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const deleteRap = async (req, res) => {
  try {
    const ok = await rapService.deleteRap(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Không tìm thấy rạp' });
    return res.json({ message: 'Xóa thành công' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

export default { createRap, getAllRaps, getRap, updateRap, deleteRap };
