import Joi from 'joi';

export const createDoAnSchema = Joi.object({
  ten_san_pham: Joi.string().max(200).required(),
  mo_ta: Joi.string().allow('', null),
  loai: Joi.string().max(50).allow('', null),
  gia: Joi.number().precision(2).allow(null),
});

export const updateDoAnSchema = Joi.object({
  ten_san_pham: Joi.string().max(200),
  mo_ta: Joi.string().allow('', null),
  loai: Joi.string().max(50).allow('', null),
  gia: Joi.number().precision(2),
});
