import { getModels } from '../models/index.js';
import { getSequelize } from '../config/mysql.js';

const { DatVe, Ve, SeatHold, KhuyenMai } = getModels();

/**
 * Assumptions:
 * - payload contains `tickets` array: [{ ghe_id, suat_chieu_id, gia_ve }]
 * - SeatHold entries exist with status 'ACTIVE' for held seats
 */
const create = async (payload) => {
  const sequelize = getSequelize();
  if (!sequelize) throw new Error('Sequelize not initialized');

  return await sequelize.transaction(async (t) => {
    const { tickets = [], ma_giam_gia_id } = payload;

    // create DatVe
    const datVe = await DatVe.create(payload, { transaction: t });

    // create Ve for each ticket
    for (const item of tickets) {
      // check SeatHold
      const hold = await SeatHold.findOne({ where: { suat_chieu_id: item.suat_chieu_id, ghe_id: item.ghe_id, status: 'ACTIVE' }, transaction: t });
      if (!hold) throw new Error(`Seat not held or already used: ghe ${item.ghe_id}`);

      // create ticket
      await Ve.create({
        ghe_id: item.ghe_id,
        Dat_Ve_id: datVe.Dat_Ve_id,
        suat_chieu_id: item.suat_chieu_id,
        ma_qr_code: item.ma_qr_code || `${datVe.Dat_Ve_id}-${item.ghe_id}`,
        trang_thai_ve: 'ACTIVE',
        gia_ve: item.gia_ve,
      }, { transaction: t });

      // mark hold as USED
      hold.status = 'USED';
      await hold.save({ transaction: t });
    }

    // decrement KhuyenMai if provided
    if (ma_giam_gia_id) {
      const km = await KhuyenMai.findByPk(ma_giam_gia_id, { transaction: t });
      if (!km) throw new Error('Ma giam gia invalid');
      if (km.so_luong_con_lai <= 0) throw new Error('Ma giam gia het hang');
      km.so_luong_con_lai = km.so_luong_con_lai - 1;
      await km.save({ transaction: t });
    }

    return datVe;
  });
};

const list = async (query = {}) => DatVe.findAll({ where: query });

const getById = async (id) => DatVe.findByPk(id);

const update = async (id, payload) => {
  const d = await DatVe.findByPk(id);
  if (!d) return null;
  await d.update(payload);
  return d;
};

const remove = async (id) => {
  const d = await DatVe.findByPk(id);
  if (!d) return false;
  await d.destroy();
  return true;
};

export default { create, list, getById, update, remove };
