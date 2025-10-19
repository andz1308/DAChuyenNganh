import Joi from 'joi';

export const createRapSchema = Joi.object({
  ten_rap: Joi.string().max(255).required(),
  dia_chi: Joi.string().allow('', null),
  email: Joi.string().email().allow('', null),
  mo_ta: Joi.string().allow('', null),
});

export const updateRapSchema = Joi.object({
  ten_rap: Joi.string().max(255),
  dia_chi: Joi.string().allow('', null),
  email: Joi.string().email().allow('', null),
  mo_ta: Joi.string().allow('', null),
});
