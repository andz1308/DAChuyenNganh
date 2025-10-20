import { MailType } from '../constants/mail.constant.js';
import AuthSchema from '../schemas/auth.schema.js';
import DomainSchema from '../schemas/domain.schema.js';

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Cinema Management API (RagDB)',
    version: '1.0.0',
    description: 'API tài liệu cho hệ thống quản lý rạp chiếu phim',
  },
  servers: [
    { url: 'http://localhost:8080', description: 'Local' },
  ],
  tags: [
    { name: 'Auths' },
    { name: 'Users' },
    { name: 'Raps' },
    { name: 'PhongChieu' },
    { name: 'Phims' },
    { name: 'SuatChieu' },
    { name: 'Ghes' },
    { name: 'SeatHolds' },
    { name: 'DatVe' },
    { name: 'Ves' },
    { name: 'DoAn' },
    { name: 'KhuyenMai' },
  { name: 'Upload' },
  { name: 'Staff' },
    { name: 'Admin' },
  ],
  paths: {
    '/api/auth/register': { post: { tags: ['Auths'], requestBody: { required: true, content: { 'application/json': { schema: AuthSchema.RegisterRequest } } }, responses: { 201: { description: 'Created' } } } },
    '/api/auth/login': { post: { tags: ['Auths'], requestBody: { required: true, content: { 'application/json': { schema: AuthSchema.LoginRequest } } }, responses: { 200: { description: 'OK' } } } },
    '/api/auth/refresh-token': { post: { tags: ['Auths'], requestBody: { required: true, content: { 'application/json': { schema: AuthSchema.RefreshTokenRequest } } }, responses: { 200: { description: 'OK' } } } },
    '/api/auth/send-otp': { post: { tags: ['Auths'], parameters: [{ name: 'type', in: 'query', required: true, schema: { type: 'string', enum: [MailType.RESET_PASSWORD, MailType.SIGN_UP] } }], requestBody: { required: true, content: { 'application/json': { schema: AuthSchema.SendOtpRequest } } }, responses: { 200: { description: 'OK' } } } },
    '/api/auth/logout': { post: { tags: ['Auths'], security: [{ bearerAuth: [] }], requestBody: { required: true, content: { 'application/json': { schema: AuthSchema.LogoutRequest } } }, responses: { 200: { description: 'OK' } } } },
    '/api/auth/reset-password': { put: { tags: ['Auths'], requestBody: { required: true, content: { 'application/json': { schema: AuthSchema.ResetPasswordRequest } } }, responses: { 200: { description: 'OK' } } } },
    '/api/auth/update-password': { put: { tags: ['Auths'], security: [{ bearerAuth: [] }], requestBody: { required: true, content: { 'application/json': { schema: AuthSchema.UpdatePasswordRequest } } }, responses: { 200: { description: 'OK' } } } },

    '/api/users/load': { get: { tags: ['Users'], security: [{ bearerAuth: [] }], responses: { 200: { description: 'OK', content: { 'application/json': { schema: DomainSchema.UserInfo } } } } } },
    '/api/users/update': { put: { tags: ['Users'], security: [{ bearerAuth: [] }], requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.UserUpdateRequest } } }, responses: { 200: { description: 'OK' } } } },

    '/api/raps': { get: { tags: ['Raps'], responses: { 200: { description: 'OK' } } }, post: { tags: ['Raps'], requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.RapCreateRequest } } }, responses: { 201: { description: 'Created' } } } },
    '/api/raps/{id}': { get: { tags: ['Raps'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } }, put: { tags: ['Raps'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.RapUpdateRequest } } }, responses: { 200: { description: 'OK' } } }, delete: { tags: ['Raps'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 204: { description: 'No Content' } } } },

    '/api/phong-chieu': { get: { tags: ['PhongChieu'], responses: { 200: { description: 'OK' } } }, post: { tags: ['PhongChieu'], requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.PhongChieuCreateRequest } } }, responses: { 201: { description: 'Created' } } } },
    '/api/phong-chieu/{id}': { get: { tags: ['PhongChieu'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } }, put: { tags: ['PhongChieu'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.PhongChieuUpdateRequest } } }, responses: { 200: { description: 'OK' } } }, delete: { tags: ['PhongChieu'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 204: { description: 'No Content' } } } },

    '/api/phims': { get: { tags: ['Phims'], responses: { 200: { description: 'OK' } } }, post: { tags: ['Phims'], requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.PhimCreateRequest } } }, responses: { 201: { description: 'Created' } } } },
    '/api/phims/{id}': { get: { tags: ['Phims'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } }, put: { tags: ['Phims'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.PhimUpdateRequest } } }, responses: { 200: { description: 'OK' } } }, delete: { tags: ['Phims'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 204: { description: 'No Content' } } } },

    '/api/suat-chieu': { get: { tags: ['SuatChieu'], responses: { 200: { description: 'OK' } } }, post: { tags: ['SuatChieu'], requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.SuatChieuCreateRequest } } }, responses: { 201: { description: 'Created' } } } },
    '/api/suat-chieu/{id}': { get: { tags: ['SuatChieu'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } }, put: { tags: ['SuatChieu'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.SuatChieuUpdateRequest } } }, responses: { 200: { description: 'OK' } } }, delete: { tags: ['SuatChieu'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 204: { description: 'No Content' } } } },

    '/api/ghes': { get: { tags: ['Ghes'], responses: { 200: { description: 'OK' } } }, post: { tags: ['Ghes'], requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.GheCreateRequest } } }, responses: { 201: { description: 'Created' } } } },
    '/api/ghes/{id}': { get: { tags: ['Ghes'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } }, put: { tags: ['Ghes'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.GheUpdateRequest } } }, responses: { 200: { description: 'OK' } } }, delete: { tags: ['Ghes'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 204: { description: 'No Content' } } } },

    '/api/seat-holds': { get: { tags: ['SeatHolds'], responses: { 200: { description: 'OK' } } }, post: { tags: ['SeatHolds'], requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.SeatHoldCreateRequest } } }, responses: { 201: { description: 'Created' } } } },
    '/api/seat-holds/{id}': { get: { tags: ['SeatHolds'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } }, delete: { tags: ['SeatHolds'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 204: { description: 'No Content' } } } },

    '/api/dat-ve': { get: { tags: ['DatVe'], responses: { 200: { description: 'OK' } } }, post: { tags: ['DatVe'], requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.DatVeCreateRequest } } }, responses: { 201: { description: 'Created' } } } },
    '/api/dat-ve/{id}': { get: { tags: ['DatVe'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } }, put: { tags: ['DatVe'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.DatVeUpdateRequest } } }, responses: { 200: { description: 'OK' } } }, delete: { tags: ['DatVe'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 204: { description: 'No Content' } } } },

    '/api/ves': { get: { tags: ['Ves'], responses: { 200: { description: 'OK' } } }, post: { tags: ['Ves'], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { ghe_id: { type: 'integer' }, Dat_Ve_id: { type: 'integer' }, suat_chieu_id: { type: 'integer' }, ma_qr_code: { type: 'string' }, trang_thai_ve: { type: 'string' }, gia_ve: { type: 'number' } }, required: ['ghe_id', 'Dat_Ve_id', 'suat_chieu_id', 'ma_qr_code', 'trang_thai_ve', 'gia_ve'] } } } }, responses: { 201: { description: 'Created' } } } },
    '/api/ves/{id}': { get: { tags: ['Ves'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } }, put: { tags: ['Ves'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { 200: { description: 'OK' } } }, delete: { tags: ['Ves'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 204: { description: 'No Content' } } } },

    '/api/do-an': { get: { tags: ['DoAn'], responses: { 200: { description: 'OK' } } }, post: { tags: ['DoAn'], requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.DoAnCreateRequest } } }, responses: { 201: { description: 'Created' } } } },
    '/api/do-an/{id}': { get: { tags: ['DoAn'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } }, put: { tags: ['DoAn'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.DoAnUpdateRequest } } }, responses: { 200: { description: 'OK' } } }, delete: { tags: ['DoAn'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 204: { description: 'No Content' } } } },

    '/api/khuyen-mai': { get: { tags: ['KhuyenMai'], responses: { 200: { description: 'OK' } } }, post: { tags: ['KhuyenMai'], requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.KhuyenMaiCreateRequest } } }, responses: { 201: { description: 'Created' } } } },
    '/api/khuyen-mai/{id}': { get: { tags: ['KhuyenMai'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } }, put: { tags: ['KhuyenMai'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.KhuyenMaiUpdateRequest } } }, responses: { 200: { description: 'OK' } } }, delete: { tags: ['KhuyenMai'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 204: { description: 'No Content' } } } },

    '/api/upload/singleFile': { post: { tags: ['Upload'], security: [{ bearerAuth: [] }], requestBody: { required: true, content: { 'multipart/form-data': { schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } }, required: ['file'] } } } }, responses: { 200: { description: 'OK' } } } },

  '/api/staff': { get: { tags: ['Staff'], responses: { 200: { description: 'OK' } } }, post: { tags: ['Staff'], requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.StaffCreateRequest } } }, responses: { 201: { description: 'Created' } } } },

    '/api/admin/create': { post: { tags: ['Admin'], security: [{ bearerAuth: [] }], requestBody: { required: true, content: { 'application/json': { schema: AuthSchema.AdminCreateAccountRequest } } }, responses: { 201: { description: 'Created' } } } },
    '/api/admin/showall': { get: { tags: ['Admin'], security: [{ bearerAuth: [] }], responses: { 200: { description: 'OK' } } } },
    '/api/admin/show/{id}': { get: { tags: ['Admin'], security: [{ bearerAuth: [] }], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } } },
    '/api/admin/update/{id}': { put: { tags: ['Admin'], security: [{ bearerAuth: [] }], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], requestBody: { required: true, content: { 'application/json': { schema: AuthSchema.AdminUpdateAccountRequest } } }, responses: { 200: { description: 'OK' } } } },
    '/api/admin/delete/{id}': { delete: { tags: ['Admin'], security: [{ bearerAuth: [] }], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 204: { description: 'No Content' } } } },
  },
  components: {
    schemas: {
      ...AuthSchema,
      ...DomainSchema,
    },
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
  },
};

export default swaggerDocument;

