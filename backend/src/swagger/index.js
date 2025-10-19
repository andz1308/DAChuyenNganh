// docs/swagger.js
import { MailType } from '../constants/mail.constant.js';
import AuthSchema from '../schemas/auth.schema.js';

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Cinema Management API (RagDB)',
    version: '1.0.0',
    description: 'API tài liệu cho hệ thống quản lý rạp chiếu phim tương tự CGV',
  },

  servers: [
    { url: 'http://localhost:8080', description: 'Local Development Server' },
    { url: '/projects/ragdb', description: 'Production - Techleaf Server' },
  ],

  tags: [
    { name: 'Auths', description: 'Xác thực và đăng nhập/đăng ký người dùng' },
    { name: 'Users', description: 'Quản lý thông tin người dùng' },
    { name: 'Raps', description: 'Quản lý thông tin rạp chiếu' },
    { name: 'PhongChieu', description: 'Quản lý phòng chiếu' },
    { name: 'Phims', description: 'Quản lý phim' },
    { name: 'SuatChieu', description: 'Quản lý suất chiếu' },
    { name: 'DatVe', description: 'Đặt vé xem phim' },
    { name: 'Admin', description: 'Quản trị hệ thống' },
  ],

  paths: {
    // -------------------- AUTH --------------------
    '/api/auth/register': {
      post: {
        tags: ['Auths'],
        summary: 'Đăng ký tài khoản mới',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: AuthSchema.RegisterRequest } },
        },
        responses: {
          201: { description: 'Đăng ký thành công' },
          400: { description: 'Sai dữ liệu đầu vào' },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Auths'],
        summary: 'Đăng nhập tài khoản',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: AuthSchema.LoginRequest } },
        },
        responses: {
          200: { description: 'Đăng nhập thành công' },
          400: { description: 'Sai thông tin đăng nhập' },
        },
      },
    },
    '/api/auth/refresh-token': {
      post: {
        tags: ['Auths'],
        summary: 'Làm mới token truy cập',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: AuthSchema.RefreshTokenRequest } },
        },
        responses: {
          200: { description: 'Trả về access token mới' },
          401: { description: 'Token không hợp lệ' },
        },
      },
    },
    '/api/auth/send-otp': {
      post: {
        tags: ['Auths'],
        summary: 'Gửi mã OTP đến email người dùng',
        parameters: [
          {
            name: 'type',
            in: 'query',
            required: true,
            schema: {
              type: 'string',
              enum: [MailType.RESET_PASSWORD, MailType.SIGN_UP],
            },
          },
        ],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: AuthSchema.SendOtpRequest } },
        },
        responses: {
          200: { description: 'Gửi OTP thành công' },
          400: { description: 'Email không hợp lệ' },
        },
      },
    },
    '/api/auth/logout': {
      post: {
        tags: ['Auths'],
        summary: 'Đăng xuất khỏi hệ thống',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: AuthSchema.LogoutRequest } },
        },
        responses: {
          200: { description: 'Đăng xuất thành công' },
          401: { description: 'Token không hợp lệ' },
        },
      },
    },

    // -------------------- USERS --------------------
    '/api/users/load': {
      get: {
        tags: ['Users'],
        summary: 'Lấy thông tin người dùng hiện tại',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Thông tin người dùng hiện tại', content: { 'application/json': { schema: AuthSchema.UserInfoRequest } } },
          401: { description: 'Token không hợp lệ hoặc hết hạn' },
        },
      },
    },
    '/api/users/update': {
      put: {
        tags: ['Users'],
        summary: 'Cập nhật thông tin người dùng',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: AuthSchema.UserUpdateRequest } },
        },
        responses: {
          200: { description: 'Cập nhật thành công' },
          400: { description: 'Sai dữ liệu' },
        },
      },
    },

    // -------------------- RAP --------------------
    '/api/raps': {
      post: {
        tags: ['Raps'],
        summary: 'Tạo rạp mới',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  ten_rap: { type: 'string' },
                  dia_chi: { type: 'string' },
                  email: { type: 'string' },
                  mo_ta: { type: 'string' },
                },
                required: ['ten_rap'],
              },
            },
          },
        },
        responses: { 201: { description: 'Tạo thành công' }, 400: { description: 'Sai dữ liệu' } },
      },
      get: {
        tags: ['Raps'],
        summary: 'Lấy danh sách rạp chiếu',
        responses: { 200: { description: 'OK' } },
      },
    },

    // -------------------- PHONG CHIEU --------------------
    '/api/phong-chieu': {
      post: {
        tags: ['PhongChieu'],
        summary: 'Tạo phòng chiếu mới',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/PhongChieuRequest' } } },
        },
        responses: { 201: { description: 'Tạo thành công' } },
      },
      get: {
        tags: ['PhongChieu'],
        summary: 'Lấy danh sách phòng chiếu',
        responses: { 200: { description: 'OK' } },
      },
    },

    // -------------------- PHIM --------------------
    '/api/phims': {
      get: {
        tags: ['Phims'],
        summary: 'Danh sách phim hiện có',
        responses: { 200: { description: 'OK' } },
      },
      post: {
        tags: ['Phims'],
        summary: 'Thêm phim mới (Admin)',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/PhimRequest' } } },
        },
        responses: { 201: { description: 'Tạo thành công' } },
      },
    },

    // -------------------- SUAT CHIEU --------------------
    '/api/suat-chieu': {
      get: {
        tags: ['SuatChieu'],
        summary: 'Lấy danh sách suất chiếu',
        responses: { 200: { description: 'OK' } },
      },
      post: {
        tags: ['SuatChieu'],
        summary: 'Tạo suất chiếu mới',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/SuatChieuRequest' } } },
        },
        responses: { 201: { description: 'Tạo thành công' } },
      },
    },

    // -------------------- DAT VE --------------------
    '/api/dat-ve': {
      post: {
        tags: ['DatVe'],
        summary: 'Đặt vé xem phim',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/DatVeRequest' } } },
        },
        responses: {
          201: {
            description: 'Đặt vé thành công',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/DatVeResponse' } } },
          },
        },
      },
      get: {
        tags: ['DatVe'],
        summary: 'Danh sách đơn đặt vé của người dùng',
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: 'OK' } },
      },
    },

    // -------------------- ADMIN --------------------
    '/api/admin/create': {
      post: {
        tags: ['Admin'],
        summary: 'Admin tạo tài khoản nhân viên',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: AuthSchema.AdminCreateAccountRequest } },
        },
        responses: { 201: { description: 'Tạo thành công' } },
      },
    },
  },

  // -------------------- COMPONENTS --------------------
  components: {
    schemas: {
      ...AuthSchema,
      PhongChieuRequest: {
        type: 'object',
        properties: {
          rap_id: { type: 'integer' },
          ten_phong: { type: 'string' },
          suc_chua: { type: 'integer' },
        },
        required: ['rap_id', 'ten_phong', 'suc_chua'],
      },
      PhimRequest: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          duration: { type: 'integer' },
          director: { type: 'string' },
          producer: { type: 'string' },
          release_date: { type: 'string', format: 'date' },
          poster_url: { type: 'string' },
          trailer_url: { type: 'string' },
        },
        required: ['title', 'duration'],
      },
      SuatChieuRequest: {
        type: 'object',
        properties: {
          phim_id: { type: 'integer' },
          phong_chieu_id: { type: 'integer' },
          ca_chieu_id: { type: 'integer' },
          ngay_chieu: { type: 'string', format: 'date' },
          base_price: { type: 'number' },
        },
        required: ['phim_id', 'phong_chieu_id', 'ca_chieu_id', 'ngay_chieu', 'base_price'],
      },
      DatVeRequest: {
        type: 'object',
        properties: {
          khach_hang_id: { type: 'integer' },
          tong_tien: { type: 'number' },
          trang_thai_Dat_Ve: { type: 'string' },
          tickets: {
            type: 'array',
            items: { $ref: '#/components/schemas/TicketItem' },
          },
        },
        required: ['khach_hang_id', 'tong_tien', 'tickets'],
      },
      DatVeResponse: {
        type: 'object',
        properties: {
          Dat_Ve_id: { type: 'integer' },
          khach_hang_id: { type: 'integer' },
          tong_tien: { type: 'number' },
          trang_thai_Dat_Ve: { type: 'string' },
        },
      },
      TicketItem: {
        type: 'object',
        properties: {
          ghe_id: { type: 'integer' },
          suat_chieu_id: { type: 'integer' },
          gia_ve: { type: 'number' },
        },
      },
    },
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
  },
};

export default swaggerDocument;
