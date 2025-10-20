import Joi from 'joi';

export const createVaiDienSchema = Joi.object({
  dien_vien_id: Joi.number().integer().required(),
  phim_id: Joi.number().integer().required(),
  ten_vai_dien: Joi.string().max(200).allow('', null),
  hinh_anh: Joi.string().allow('', null),
  mo_ta: Joi.string().max(200).allow('', null),
});

export const updateVaiDienSchema = Joi.object({
  dien_vien_id: Joi.number().integer(),
  phim_id: Joi.number().integer(),
  ten_vai_dien: Joi.string().max(200).allow('', null),
  hinh_anh: Joi.string().allow('', null),
  mo_ta: Joi.string().max(200).allow('', null),
});
