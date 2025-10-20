import Joi from 'joi';

export const createLoaiGheSchema = Joi.object({
  ten_loai: Joi.string().max(100).required(),
  phu_phi: Joi.number().precision(2).required(),
});

export const updateLoaiGheSchema = Joi.object({
  ten_loai: Joi.string().max(100),
  phu_phi: Joi.number().precision(2),
});
