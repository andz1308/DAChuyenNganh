import Joi from 'joi';

export const createDanhGiaSchema = Joi.object({
  ve_id: Joi.number().integer().required(),
  khach_hang_id: Joi.number().integer().required(),
  phim_id: Joi.number().integer().required(),
  noi_dung: Joi.string().allow('', null),
  diem_rating: Joi.number().integer().min(1).max(10).required(),
});

export const updateDanhGiaSchema = Joi.object({
  ve_id: Joi.number().integer(),
  khach_hang_id: Joi.number().integer(),
  phim_id: Joi.number().integer(),
  noi_dung: Joi.string().allow('', null),
  diem_rating: Joi.number().integer().min(1).max(10),
});
