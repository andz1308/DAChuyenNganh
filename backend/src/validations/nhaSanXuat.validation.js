import Joi from 'joi';

export const createNhaSanXuatSchema = Joi.object({
  ten_nha_san_xuat: Joi.string().max(255).required(),
  quoc_gia: Joi.string().max(100).allow('', null),
});

export const updateNhaSanXuatSchema = Joi.object({
  ten_nha_san_xuat: Joi.string().max(255),
  quoc_gia: Joi.string().max(100).allow('', null),
});
