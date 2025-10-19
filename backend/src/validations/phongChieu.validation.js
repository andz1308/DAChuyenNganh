import Joi from 'joi';

export const createPhongChieuSchema = Joi.object({
  rap_id: Joi.number().integer().required(),
  ten_phong: Joi.string().max(50).required(),
  suc_chua: Joi.number().integer().required(),
});

export const updatePhongChieuSchema = Joi.object({
  rap_id: Joi.number().integer(),
  ten_phong: Joi.string().max(50),
  suc_chua: Joi.number().integer(),
});
