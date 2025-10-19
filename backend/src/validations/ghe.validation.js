import Joi from 'joi';

export const createGheSchema = Joi.object({
  phong_chieu_id: Joi.number().integer().required(),
  so_ghe: Joi.string().max(10).required(),
  loai_ghe_id: Joi.number().integer().required(),
  trang_thai: Joi.number().integer().optional(),
});

export const updateGheSchema = Joi.object({
  phong_chieu_id: Joi.number().integer(),
  so_ghe: Joi.string().max(10),
  loai_ghe_id: Joi.number().integer(),
  trang_thai: Joi.number().integer(),
});
