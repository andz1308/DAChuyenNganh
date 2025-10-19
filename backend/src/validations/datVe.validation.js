import Joi from 'joi';

export const ticketItemSchema = Joi.object({
  ghe_id: Joi.number().integer().required(),
  suat_chieu_id: Joi.number().integer().required(),
  gia_ve: Joi.number().precision(2).required(),
});

export const createDatVeSchema = Joi.object({
  khach_hang_id: Joi.number().integer().required(),
  tong_tien: Joi.number().precision(2).required(),
  trang_thai_Dat_Ve: Joi.string().required(),
  ma_giam_gia_id: Joi.number().integer().optional(),
  tickets: Joi.array().items(ticketItemSchema).min(1).required(),
});

export const updateDatVeSchema = Joi.object({
  trang_thai_Dat_Ve: Joi.string(),
  tong_tien: Joi.number().precision(2),
});
