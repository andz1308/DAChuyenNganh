import Joi from 'joi';

export const createLoaiNgaySchema = Joi.object({
  loai_ngay: Joi.string().max(50).required(),
  phu_phi: Joi.number().precision(2).required(),
});

export const updateLoaiNgaySchema = Joi.object({
  loai_ngay: Joi.string().max(50),
  phu_phi: Joi.number().precision(2),
});
