import Joi from 'joi';

export const createKhuyenMaiSchema = Joi.object({
  loai_giam_gia: Joi.string().required(),
  gia_tri_giam: Joi.number().precision(2).required(),
  ngay_bat_dau: Joi.date().required(),
  ngay_ket_thuc: Joi.date().required(),
  trang_thai: Joi.string().required(),
  so_luong_ban_dau: Joi.number().integer().optional(),
  so_luong_con_lai: Joi.number().integer().optional(),
  mo_ta: Joi.string().allow('', null),
});

export const updateKhuyenMaiSchema = Joi.object({
  loai_giam_gia: Joi.string(),
  gia_tri_giam: Joi.number().precision(2),
  ngay_bat_dau: Joi.date(),
  ngay_ket_thuc: Joi.date(),
  trang_thai: Joi.string(),
  so_luong_ban_dau: Joi.number().integer(),
  so_luong_con_lai: Joi.number().integer(),
  mo_ta: Joi.string().allow('', null),
});
