import joiToSwagger from 'joi-to-swagger';
import { resetPasswordSchema, loginSchema, userRegisterSchema, updatePasswordSchema, refreshTokenSchema, sendOtpSchema, logoutSchema } from '../validations/auth.validation.js';
import { userUpdateSchema } from '../validations/user.validation.js';
import { databaseCreateSchema, databaseUpdateSchema, } from "../validations/database.validation.js";
import { createAccountSchema, updateAccountSchema, } from '../validations/admin.validation.js';

const { swagger: LoginRequest } = joiToSwagger(loginSchema);
const { swagger: RegisterRequest } = joiToSwagger(userRegisterSchema);
const { swagger: ResetPasswordRequest } = joiToSwagger(resetPasswordSchema);
const { swagger: UserUpdateRequest } = joiToSwagger(userUpdateSchema);
const { swagger: UpdatePasswordRequest } = joiToSwagger(updatePasswordSchema);
const { swagger: RefreshTokenRequest } = joiToSwagger(refreshTokenSchema);
const { swagger: SendOtpRequest } = joiToSwagger(sendOtpSchema);
const { swagger: LogoutRequest } = joiToSwagger(logoutSchema);
const { swagger: DatabaseCreateRequest } = joiToSwagger(databaseCreateSchema);
const { swagger: DatabaseUpdateRequest } = joiToSwagger(databaseUpdateSchema);
const { swagger: AdminCreateAccountRequest } = joiToSwagger(createAccountSchema);
const { swagger: AdminUpdateAccountRequest } = joiToSwagger(updateAccountSchema);

export default {
    LoginRequest,
    RegisterRequest,
    ResetPasswordRequest,
    RefreshTokenRequest,
    SendOtpRequest,
    LogoutRequest,
    UserUpdateRequest,
    UpdatePasswordRequest,
    DatabaseCreateRequest,
    DatabaseUpdateRequest,
    AdminCreateAccountRequest,
    AdminUpdateAccountRequest,
};
