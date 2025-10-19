import Joi from 'joi';

export const createSuatChieuSchema = Joi.object({
  phim_id: Joi.number().integer().required(),
  phong_chieu_id: Joi.number().integer().required(),
  ca_chieu_id: Joi.number().integer().required(),
  ngay_chieu: Joi.date().required(),
  loai_ngay_id: Joi.number().integer().required(),
  ngon_ngu: Joi.string().allow('', null),
  gia_ve: Joi.number().precision(2).required(),
});

export const updateSuatChieuSchema = Joi.object({
  phim_id: Joi.number().integer(),
  phong_chieu_id: Joi.number().integer(),
  ca_chieu_id: Joi.number().integer(),
  ngay_chieu: Joi.date(),
  loai_ngay_id: Joi.number().integer(),
  ngon_ngu: Joi.string().allow('', null),
  gia_ve: Joi.number().precision(2),
});
