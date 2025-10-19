import { getModels } from '../models/index.js';
import seatHoldService from '../services/seatHold.service.js';
import { toSeatHoldDto, toSeatHoldListDto } from '../mappers/seatHold.mapper.js';

const createSeatHold = async (req, res) => {
  try {
    const sh = await seatHoldService.create(req.body);
    return res.status(201).json(toSeatHoldDto(sh));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const listSeatHolds = async (req, res) => {
  try {
    const list = await seatHoldService.list(req.query);
    return res.json(toSeatHoldListDto(list));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const getSeatHold = async (req, res) => {
  try {
    const sh = await seatHoldService.getById(req.params.id);
    if (!sh) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json(toSeatHoldDto(sh));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const releaseSeatHold = async (req, res) => {
  try {
    const sh = await seatHoldService.release(req.params.id);
    if (!sh) return res.status(404).json({ message: 'Không tìm thấy' });
    return res.json(toSeatHoldDto(sh));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

export default { createSeatHold, listSeatHolds, getSeatHold, releaseSeatHold };
