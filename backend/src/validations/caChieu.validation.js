import Joi from 'joi';

export const createCaChieuSchema = Joi.object({
  gio_bat_dau: Joi.string().required(),
  gio_ket_thuc: Joi.string().required(),
});

export const updateCaChieuSchema = Joi.object({
  gio_bat_dau: Joi.string(),
  gio_ket_thuc: Joi.string(),
});
