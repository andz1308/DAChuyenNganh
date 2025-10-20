import Joi from 'joi';

export const createDonHangDoAnSchema = Joi.object({
  Dat_Ve_id: Joi.number().integer().required(),
  Do_An_id: Joi.number().integer().required(),
  so_luong: Joi.number().integer().min(1).required(),
});

export const updateDonHangDoAnSchema = Joi.object({
  Dat_Ve_id: Joi.number().integer(),
  Do_An_id: Joi.number().integer(),
  so_luong: Joi.number().integer().min(1),
});
