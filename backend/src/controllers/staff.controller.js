import { getModels } from '../models/index.js';
import staffService from '../services/staff.service.js';

const createStaff = async (req, res) => {
  try {
    const s = await staffService.create(req.body);
    return res.status(201).json(s);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const listStaff = async (req, res) => {
  try {
    const list = await staffService.list();
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

export default { createStaff, listStaff };
