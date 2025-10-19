import Joi from 'joi';

export const createPhimSchema = Joi.object({
  ten_phim: Joi.string().max(255).required(),
  dao_dien_id: Joi.number().integer().allow(null),
  nha_san_xuat_id: Joi.number().integer().allow(null),
  thoi_luong: Joi.number().integer().allow(null),
  mo_ta: Joi.string().allow('', null),
  hinh_anh: Joi.string().allow('', null),
  video: Joi.string().allow('', null),
  ngay_khoi_chieu: Joi.date().allow(null),
});

export const updatePhimSchema = Joi.object({
  ten_phim: Joi.string().max(255),
  dao_dien_id: Joi.number().integer(),
  nha_san_xuat_id: Joi.number().integer(),
  thoi_luong: Joi.number().integer(),
  mo_ta: Joi.string().allow('', null),
  hinh_anh: Joi.string().allow('', null),
  video: Joi.string().allow('', null),
  ngay_khoi_chieu: Joi.date(),
});
