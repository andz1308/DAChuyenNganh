import Joi from 'joi';

export const createDaoDienSchema = Joi.object({
  ho_ten: Joi.string().max(200).required(),
  ngay_sinh: Joi.date().allow(null),
  quoc_tich: Joi.string().max(100).allow('', null),
  tieu_su: Joi.string().allow('', null),
  hinh_anh: Joi.string().allow('', null),
});

export const updateDaoDienSchema = Joi.object({
  ho_ten: Joi.string().max(200),
  ngay_sinh: Joi.date(),
  quoc_tich: Joi.string().max(100).allow('', null),
  tieu_su: Joi.string().allow('', null),
  hinh_anh: Joi.string().allow('', null),
});
