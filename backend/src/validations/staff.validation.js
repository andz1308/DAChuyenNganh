import Joi from 'joi';

export const createStaffSchema = Joi.object({
  ho_ten: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  so_dien_thoai: Joi.string().allow('', null),
  dia_chi: Joi.string().allow('', null),
});
