import Joi from 'joi';

export const createSeatHoldSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  suat_chieu_id: Joi.number().integer().required(),
  ghe_id: Joi.number().integer().required(),
  hold_token: Joi.string().optional(),
  expires_at: Joi.date().optional(),
});

export const listSeatHoldSchema = Joi.object({});
// no-op
