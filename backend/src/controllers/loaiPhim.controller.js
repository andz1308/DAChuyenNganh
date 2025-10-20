import loaiPhimService from '../services/loaiPhim.service.js';

const create = async (req, res) => {
  try {
    const item = await loaiPhimService.create(req.body);
    return res.status(201).json(item);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const list = async (req, res) => {
  try {
    const result = await loaiPhimService.list(req.query);
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const get = async (req, res) => {
  try {
    const item = await loaiPhimService.getById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json(item);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const update = async (req, res) => {
  try {
    const item = await loaiPhimService.update(req.params.id, req.body);
    if (!item) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json(item);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const remove = async (req, res) => {
  try {
    const ok = await loaiPhimService.remove(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json({ message: 'Xóa thành công' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

export default { create, list, get, update, remove };
