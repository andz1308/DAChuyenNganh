import Joi from 'joi';

export const createLoaiPhimSchema = Joi.object({
  ten_loai: Joi.string().max(100).required(),
  mo_ta: Joi.string().allow('', null),
});

export const updateLoaiPhimSchema = Joi.object({
  ten_loai: Joi.string().max(100),
  mo_ta: Joi.string().allow('', null),
});
