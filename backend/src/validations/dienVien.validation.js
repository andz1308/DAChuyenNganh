import Joi from 'joi';

export const createDienVienSchema = Joi.object({
  ho_ten: Joi.string().max(200).required(),
  gioi_tinh: Joi.string().max(10).allow('', null),
  nghe_danh: Joi.string().max(200).allow('', null),
  ngay_sinh: Joi.date().allow(null),
  quoc_tich: Joi.string().max(100).allow('', null),
  tieu_su: Joi.string().allow('', null),
  hinh_anh: Joi.string().allow('', null),
});

export const updateDienVienSchema = Joi.object({
  ho_ten: Joi.string().max(200),
  gioi_tinh: Joi.string().max(10).allow('', null),
  nghe_danh: Joi.string().max(200).allow('', null),
  ngay_sinh: Joi.date(),
  quoc_tich: Joi.string().max(100).allow('', null),
  tieu_su: Joi.string().allow('', null),
  hinh_anh: Joi.string().allow('', null),
});
