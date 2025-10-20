// docs/swaggerDocument.js
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
  servers: [{ url: 'http://localhost:8080', description: 'Local' }],

  // Tag list (module-level)
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
    { name: 'LoaiPhim' },
    { name: 'LoaiNgay' },
    { name: 'CaChieu' },
    { name: 'DaoDien' },
    { name: 'DienVien' },
    { name: 'NhaSanXuat' },
    { name: 'LoaiGhe' },
    { name: 'VaiDien' },
    { name: 'DanhGia' },
    { name: 'DonHangDoAn' },
  ],

  /***************************************************************************
   * PATHS
   * - Nhóm theo module để dễ đọc / maintain
   ***************************************************************************/
  paths: {
    // -------------------- AUTH --------------------
    '/api/auth/register': {
      post: {
        tags: ['Auths'],
        summary: 'Đăng ký',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: AuthSchema.RegisterRequest } },
        },
        responses: { 201: { description: 'Created' } },
      },
    },

    '/api/auth/login': {
      post: {
        tags: ['Auths'],
        summary: 'Đăng nhập',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: AuthSchema.LoginRequest } },
        },
        responses: { 200: { description: 'OK' } },
      },
    },

    '/api/auth/refresh-token': {
      post: {
        tags: ['Auths'],
        summary: 'Làm mới access token',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: AuthSchema.RefreshTokenRequest } },
        },
        responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
      },
    },

    '/api/auth/send-otp': {
      post: {
        tags: ['Auths'],
        summary: 'Gửi OTP tới email',
        parameters: [
          {
            name: 'type',
            in: 'query',
            required: true,
            schema: { type: 'string', enum: [MailType.RESET_PASSWORD, MailType.SIGN_UP] },
          },
        ],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: AuthSchema.SendOtpRequest } },
        },
        responses: { 200: { description: 'OK' }, 400: { description: 'Bad Request' } },
      },
    },

    '/api/auth/logout': {
      post: {
        tags: ['Auths'],
        summary: 'Đăng xuất',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: AuthSchema.LogoutRequest } },
        },
        responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
      },
    },

    '/api/auth/reset-password': {
      put: {
        tags: ['Auths'],
        summary: 'Reset mật khẩu bằng OTP',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: AuthSchema.ResetPasswordRequest } },
        },
        responses: { 200: { description: 'OK' }, 400: { description: 'Bad Request' } },
      },
    },

    '/api/auth/update-password': {
      put: {
        tags: ['Auths'],
        summary: 'Người dùng đổi mật khẩu',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: AuthSchema.UpdatePasswordRequest } },
        },
        responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
      },
    },

    // -------------------- USERS --------------------
    '/api/users/load': {
      get: {
        tags: ['Users'],
        summary: 'Lấy thông tin user hiện tại',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: DomainSchema.UserInfo } } },
          401: { description: 'Unauthorized' },
        },
      },
    },

    '/api/users/update': {
      put: {
        tags: ['Users'],
        summary: 'Cập nhật thông tin user',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: DomainSchema.UserUpdateRequest } },
        },
        responses: { 200: { description: 'OK' }, 400: { description: 'Bad Request' } },
      },
    },

    // -------------------- RAPS --------------------
    '/api/raps': {
      get: {
        tags: ['Raps'],
        summary: 'Lấy danh sách rạp',
        responses: { 200: { description: 'OK' } },
      },
      post: {
        tags: ['Raps'],
        summary: 'Tạo rạp',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: DomainSchema.RapCreateRequest } },
        },
        responses: { 201: { description: 'Created' }, 400: { description: 'Bad Request' } },
      },
    },

    '/api/raps/{id}': {
      get: {
        tags: ['Raps'],
        summary: 'Lấy chi tiết rạp',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } },
      },
      put: {
        tags: ['Raps'],
        summary: 'Cập nhật rạp',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.RapUpdateRequest } } },
        responses: { 200: { description: 'OK' }, 400: { description: 'Bad Request' } },
      },
      delete: {
        tags: ['Raps'],
        summary: 'Xóa rạp',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        responses: { 204: { description: 'No Content' }, 404: { description: 'Not found' } },
      },
    },

    // -------------------- PHÒNG CHIẾU --------------------
    '/api/phong-chieu': {
      get: { tags: ['PhongChieu'], summary: 'Lấy danh sách phòng chiếu', responses: { 200: { description: 'OK' } } },
      post: {
        tags: ['PhongChieu'],
        summary: 'Tạo phòng chiếu',
        requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.PhongChieuCreateRequest } } },
        responses: { 201: { description: 'Created' } },
      },
    },

    '/api/phong-chieu/{id}': {
      get: {
        tags: ['PhongChieu'],
        summary: 'Chi tiết phòng chiếu',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } },
      },
      put: {
        tags: ['PhongChieu'],
        summary: 'Cập nhật phòng chiếu',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.PhongChieuUpdateRequest } } },
        responses: { 200: { description: 'OK' } },
      },
      delete: {
        tags: ['PhongChieu'],
        summary: 'Xóa phòng chiếu',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        responses: { 204: { description: 'No Content' } },
      },
    },

    // -------------------- PHIMS (FILMS) --------------------
    '/api/phims': {
      get: { tags: ['Phims'], summary: 'Lấy danh sách phim', responses: { 200: { description: 'OK' } } },
      post: {
        tags: ['Phims'],
        summary: 'Tạo phim',
        requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.PhimCreateRequest } } },
        responses: { 201: { description: 'Created' } },
      },
    },

    '/api/phims/{id}': {
      get: {
        tags: ['Phims'],
        summary: 'Chi tiết phim',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } },
      },
      put: {
        tags: ['Phims'],
        summary: 'Cập nhật phim',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.PhimUpdateRequest } } },
        responses: { 200: { description: 'OK' } },
      },
      delete: {
        tags: ['Phims'],
        summary: 'Xóa phim',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        responses: { 204: { description: 'No Content' } },
      },
    },

    // -------------------- SUẤT CHIẾU --------------------
    '/api/suat-chieu': {
      get: { tags: ['SuatChieu'], summary: 'Lấy danh sách suất chiếu', responses: { 200: { description: 'OK' } } },
      post: {
        tags: ['SuatChieu'],
        summary: 'Tạo suất chiếu',
        requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.SuatChieuCreateRequest } } },
        responses: { 201: { description: 'Created' } },
      },
    },

    '/api/suat-chieu/{id}': {
      get: {
        tags: ['SuatChieu'],
        summary: 'Chi tiết suất chiếu',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } },
      },
      put: {
        tags: ['SuatChieu'],
        summary: 'Cập nhật suất chiếu',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.SuatChieuUpdateRequest } } },
        responses: { 200: { description: 'OK' } },
      },
      delete: {
        tags: ['SuatChieu'],
        summary: 'Xóa suất chiếu',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        responses: { 204: { description: 'No Content' } },
      },
    },

    // -------------------- GHẾ --------------------
    '/api/ghes': {
      get: { tags: ['Ghes'], summary: 'Danh sách ghế', responses: { 200: { description: 'OK' } } },
      post: {
        tags: ['Ghes'],
        summary: 'Tạo ghế',
        requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.GheCreateRequest } } },
        responses: { 201: { description: 'Created' } },
      },
    },

    '/api/ghes/{id}': {
      get: {
        tags: ['Ghes'],
        summary: 'Chi tiết ghế',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } },
      },
      put: {
        tags: ['Ghes'],
        summary: 'Cập nhật ghế',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.GheUpdateRequest } } },
        responses: { 200: { description: 'OK' } },
      },
      delete: {
        tags: ['Ghes'],
        summary: 'Xóa ghế',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        responses: { 204: { description: 'No Content' } },
      },
    },

    // -------------------- SEAT HOLDS --------------------
    '/api/seat-holds': {
      get: { tags: ['SeatHolds'], summary: 'Danh sách giữ chỗ', responses: { 200: { description: 'OK' } } },
      post: {
        tags: ['SeatHolds'],
        summary: 'Tạo giữ chỗ',
        requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.SeatHoldCreateRequest } } },
        responses: { 201: { description: 'Created' } },
      },
    },

    '/api/seat-holds/{id}': {
      get: {
        tags: ['SeatHolds'],
        summary: 'Chi tiết giữ chỗ',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } },
      },
      delete: {
        tags: ['SeatHolds'],
        summary: 'Hủy giữ chỗ',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        responses: { 204: { description: 'No Content' } },
      },
    },

    // -------------------- ĐẶT VÉ --------------------
    '/api/dat-ve': {
      get: { tags: ['DatVe'], summary: 'Danh sách đơn đặt vé', responses: { 200: { description: 'OK' } } },
      post: {
        tags: ['DatVe'],
        summary: 'Tạo đơn đặt vé',
        requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.DatVeCreateRequest } } },
        responses: { 201: { description: 'Created' } },
      },
    },

    '/api/dat-ve/{id}': {
      get: {
        tags: ['DatVe'],
        summary: 'Chi tiết đặt vé',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } },
      },
      put: {
        tags: ['DatVe'],
        summary: 'Cập nhật đơn đặt vé',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.DatVeUpdateRequest } } },
        responses: { 200: { description: 'OK' } },
      },
      delete: {
        tags: ['DatVe'],
        summary: 'Xóa đơn đặt vé',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        responses: { 204: { description: 'No Content' } },
      },
    },

    // -------------------- VÉ --------------------
    '/api/ves': {
      get: { tags: ['Ves'], summary: 'Danh sách vé', responses: { 200: { description: 'OK' } } },
      post: {
        tags: ['Ves'],
        summary: 'Tạo vé',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  ghe_id: { type: 'integer' },
                  Dat_Ve_id: { type: 'integer' },
                  suat_chieu_id: { type: 'integer' },
                  ma_qr_code: { type: 'string' },
                  trang_thai_ve: { type: 'string' },
                  gia_ve: { type: 'number' },
                },
                required: ['ghe_id', 'Dat_Ve_id', 'suat_chieu_id', 'ma_qr_code', 'trang_thai_ve', 'gia_ve'],
              },
            },
          },
        },
        responses: { 201: { description: 'Created' } },
      },
    },

    '/api/ves/{id}': {
      get: {
        tags: ['Ves'],
        summary: 'Chi tiết vé',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } },
      },
      put: {
        tags: ['Ves'],
        summary: 'Cập nhật vé',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } },
        responses: { 200: { description: 'OK' } },
      },
      delete: {
        tags: ['Ves'],
        summary: 'Xóa vé',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        responses: { 204: { description: 'No Content' } },
      },
    },

    // -------------------- ĐỒ ĂN --------------------
    '/api/do-an': {
      get: { tags: ['DoAn'], summary: 'Danh sách đồ ăn', responses: { 200: { description: 'OK' } } },
      post: {
        tags: ['DoAn'],
        summary: 'Tạo đồ ăn',
        requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.DoAnCreateRequest } } },
        responses: { 201: { description: 'Created' } },
      },
    },

    '/api/do-an/{id}': {
      get: {
        tags: ['DoAn'],
        summary: 'Chi tiết đồ ăn',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } },
      },
      put: {
        tags: ['DoAn'],
        summary: 'Cập nhật đồ ăn',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.DoAnUpdateRequest } } },
        responses: { 200: { description: 'OK' } },
      },
      delete: {
        tags: ['DoAn'],
        summary: 'Xóa đồ ăn',
        parameters: [{ $ref: '#/components/parameters/IdParamInteger' }],
        responses: { 204: { description: 'No Content' } },
      },
    },

    // -------------------- KHUYẾN MÃI --------------------
    '/api/khuyen-mai': {
      get: { tags: ['KhuyenMai'], summary: 'Danh sách khuyến mãi', responses: { 200: { description: 'OK' } } },
      post: {
        tags: ['KhuyenMai'],
        summary: 'Tạo khuyến mãi',
        requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.KhuyenMaiCreateRequest } } },
        responses: { 201: { description: 'Created' } },
      },
    },

    // -------------------- LOẠI PHIM, NGÀY, CA CHIẾU, VÀ CÁC ENTITIES KHÁC --------------------
    '/api/loai-phim': {
      get: {
        tags: ['LoaiPhim'],
        summary: 'Danh sách loại phim',
        parameters: [{ name: 'page', in: 'query', schema: { type: 'integer', default: 1 } }, { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } }],
        responses: { 200: { description: 'OK' } },
      },
      post: {
        tags: ['LoaiPhim'],
        summary: 'Tạo loại phim',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LoaiPhimCreateRequest' } } } },
        responses: { 201: { description: 'Created' } },
      },
    },
    '/api/loai-phim/{id}': {
      get: { tags: ['LoaiPhim'], summary: 'Chi tiết', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } },
      put: { tags: ['LoaiPhim'], summary: 'Cập nhật', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LoaiPhimUpdateRequest' } } } }, responses: { 200: { description: 'OK' } } },
      delete: { tags: ['LoaiPhim'], summary: 'Xóa', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 204: { description: 'No Content' } } },
    },

    '/api/loai-ngay': {
      get: { tags: ['LoaiNgay'], summary: 'Danh sách loại ngày', parameters: [{ name: 'page', in: 'query', schema: { type: 'integer', default: 1 } }, { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } }], responses: { 200: { description: 'OK' } } },
      post: { tags: ['LoaiNgay'], summary: 'Tạo loại ngày', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LoaiNgayCreateRequest' } } } }, responses: { 201: { description: 'Created' } } },
    },
    '/api/loai-ngay/{id}': {
      get: { tags: ['LoaiNgay'], summary: 'Chi tiết', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } },
      put: { tags: ['LoaiNgay'], summary: 'Cập nhật', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LoaiNgayUpdateRequest' } } } }, responses: { 200: { description: 'OK' } } },
      delete: { tags: ['LoaiNgay'], summary: 'Xóa', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 204: { description: 'No Content' } } },
    },

    '/api/ca-chieu': {
      get: { tags: ['CaChieu'], summary: 'Danh sách ca chiếu', parameters: [{ name: 'page', in: 'query', schema: { type: 'integer', default: 1 } }, { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } }], responses: { 200: { description: 'OK' } } },
      post: { tags: ['CaChieu'], summary: 'Tạo ca chiếu', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CaChieuCreateRequest' } } } }, responses: { 201: { description: 'Created' } } },
    },
    '/api/ca-chieu/{id}': {
      get: { tags: ['CaChieu'], summary: 'Chi tiết', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } },
      put: { tags: ['CaChieu'], summary: 'Cập nhật', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CaChieuUpdateRequest' } } } }, responses: { 200: { description: 'OK' } } },
      delete: { tags: ['CaChieu'], summary: 'Xóa', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 204: { description: 'No Content' } } },
    },

    '/api/dao-dien': {
      get: { tags: ['DaoDien'], summary: 'Danh sách đạo diễn', parameters: [{ name: 'page', in: 'query', schema: { type: 'integer', default: 1 } }, { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } }], responses: { 200: { description: 'OK' } } },
      post: { tags: ['DaoDien'], summary: 'Tạo đạo diễn', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/DaoDienCreateRequest' } } } }, responses: { 201: { description: 'Created' } } },
    },
    '/api/dao-dien/{id}': {
      get: { tags: ['DaoDien'], summary: 'Chi tiết', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } },
      put: { tags: ['DaoDien'], summary: 'Cập nhật', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/DaoDienUpdateRequest' } } } }, responses: { 200: { description: 'OK' } } },
      delete: { tags: ['DaoDien'], summary: 'Xóa', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 204: { description: 'No Content' } } },
    },

    '/api/dien-vien': {
      get: { tags: ['DienVien'], summary: 'Danh sách diễn viên', parameters: [{ name: 'page', in: 'query', schema: { type: 'integer', default: 1 } }, { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } }], responses: { 200: { description: 'OK' } } },
      post: { tags: ['DienVien'], summary: 'Tạo diễn viên', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/DienVienCreateRequest' } } } }, responses: { 201: { description: 'Created' } } },
    },
    '/api/dien-vien/{id}': {
      get: { tags: ['DienVien'], summary: 'Chi tiết', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } },
      put: { tags: ['DienVien'], summary: 'Cập nhật', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/DienVienUpdateRequest' } } } }, responses: { 200: { description: 'OK' } } },
      delete: { tags: ['DienVien'], summary: 'Xóa', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 204: { description: 'No Content' } } },
    },

    '/api/nha-san-xuat': {
      get: { tags: ['NhaSanXuat'], summary: 'Danh sách NSX', parameters: [{ name: 'page', in: 'query', schema: { type: 'integer', default: 1 } }, { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } }], responses: { 200: { description: 'OK' } } },
      post: { tags: ['NhaSanXuat'], summary: 'Tạo NSX', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/NhaSanXuatCreateRequest' } } } }, responses: { 201: { description: 'Created' } } },
    },
    '/api/nha-san-xuat/{id}': {
      get: { tags: ['NhaSanXuat'], summary: 'Chi tiết', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } },
      put: { tags: ['NhaSanXuat'], summary: 'Cập nhật', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/NhaSanXuatUpdateRequest' } } } }, responses: { 200: { description: 'OK' } } },
      delete: { tags: ['NhaSanXuat'], summary: 'Xóa', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 204: { description: 'No Content' } } },
    },

    '/api/loai-ghe': {
      get: { tags: ['LoaiGhe'], summary: 'Danh sách loại ghế', parameters: [{ name: 'page', in: 'query', schema: { type: 'integer', default: 1 } }, { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } }], responses: { 200: { description: 'OK' } } },
      post: { tags: ['LoaiGhe'], summary: 'Tạo loại ghế', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LoaiGheCreateRequest' } } } }, responses: { 201: { description: 'Created' } } },
    },
    '/api/loai-ghe/{id}': {
      get: { tags: ['LoaiGhe'], summary: 'Chi tiết', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } },
      put: { tags: ['LoaiGhe'], summary: 'Cập nhật', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LoaiGheUpdateRequest' } } } }, responses: { 200: { description: 'OK' } } },
      delete: { tags: ['LoaiGhe'], summary: 'Xóa', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 204: { description: 'No Content' } } },
    },

    '/api/vai-dien': {
      get: { tags: ['VaiDien'], summary: 'Danh sách vai diễn', parameters: [{ name: 'page', in: 'query', schema: { type: 'integer', default: 1 } }, { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } }], responses: { 200: { description: 'OK' } } },
      post: { tags: ['VaiDien'], summary: 'Tạo vai diễn', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/VaiDienCreateRequest' } } } }, responses: { 201: { description: 'Created' } } },
    },
    '/api/vai-dien/{id}': {
      get: { tags: ['VaiDien'], summary: 'Chi tiết', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } },
      put: { tags: ['VaiDien'], summary: 'Cập nhật', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/VaiDienUpdateRequest' } } } }, responses: { 200: { description: 'OK' } } },
      delete: { tags: ['VaiDien'], summary: 'Xóa', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 204: { description: 'No Content' } } },
    },

    '/api/danh-gia': {
      get: { tags: ['DanhGia'], summary: 'Danh sách đánh giá', parameters: [{ name: 'page', in: 'query', schema: { type: 'integer', default: 1 } }, { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } }], responses: { 200: { description: 'OK' } } },
      post: { tags: ['DanhGia'], summary: 'Tạo đánh giá', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/DanhGiaCreateRequest' } } } }, responses: { 201: { description: 'Created' } } },
    },
    '/api/danh-gia/{id}': {
      get: { tags: ['DanhGia'], summary: 'Chi tiết', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } },
      put: { tags: ['DanhGia'], summary: 'Cập nhật', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/DanhGiaUpdateRequest' } } } }, responses: { 200: { description: 'OK' } } },
      delete: { tags: ['DanhGia'], summary: 'Xóa', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 204: { description: 'No Content' } } },
    },

    '/api/don-hang-do-an': {
      get: { tags: ['DonHangDoAn'], summary: 'Danh sách đơn hàng đồ ăn', parameters: [{ name: 'page', in: 'query', schema: { type: 'integer', default: 1 } }, { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } }], responses: { 200: { description: 'OK' } } },
      post: { tags: ['DonHangDoAn'], summary: 'Tạo đơn hàng đồ ăn', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/DonHangDoAnCreateRequest' } } } }, responses: { 201: { description: 'Created' } } },
    },
    '/api/don-hang-do-an/{id}': {
      get: { tags: ['DonHangDoAn'], summary: 'Chi tiết', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } },
      put: { tags: ['DonHangDoAn'], summary: 'Cập nhật', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/DonHangDoAnUpdateRequest' } } } }, responses: { 200: { description: 'OK' } } },
      delete: { tags: ['DonHangDoAn'], summary: 'Xóa', parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 204: { description: 'No Content' } } },
    },

    // -------------------- UPLOAD --------------------
    '/api/upload/singleFile': {
      post: {
        tags: ['Upload'],
        summary: 'Tải lên 1 tệp',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: { file: { type: 'string', format: 'binary' } },
                required: ['file'],
              },
            },
          },
        },
        responses: { 200: { description: 'OK' }, 400: { description: 'Bad Request' }, 401: { description: 'Unauthorized' } },
      },
    },

    // -------------------- STAFF --------------------
    '/api/staff': {
      get: { tags: ['Staff'], summary: 'Danh sách nhân viên', responses: { 200: { description: 'OK' } } },
      post: { tags: ['Staff'], summary: 'Tạo nhân viên', requestBody: { required: true, content: { 'application/json': { schema: DomainSchema.StaffCreateRequest } } }, responses: { 201: { description: 'Created' } } },
    },

    // -------------------- ADMIN --------------------
    '/api/admin/create': {
      post: {
        tags: ['Admin'],
        summary: 'Admin tạo tài khoản nhân viên',
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: AuthSchema.AdminCreateAccountRequest } } },
        responses: { 201: { description: 'Created' } },
      },
    },
    '/api/admin/showall': { get: { tags: ['Admin'], summary: 'Danh sách tất cả users', security: [{ bearerAuth: [] }], responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } } } },
    '/api/admin/show/{id}': { get: { tags: ['Admin'], summary: 'Lấy user theo ID', security: [{ bearerAuth: [] }], parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } } },
    '/api/admin/update/{id}': { put: { tags: ['Admin'], summary: 'Cập nhật user theo ID', security: [{ bearerAuth: [] }], parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], requestBody: { required: true, content: { 'application/json': { schema: AuthSchema.AdminUpdateAccountRequest } } }, responses: { 200: { description: 'OK' } } } },
    '/api/admin/delete/{id}': { delete: { tags: ['Admin'], summary: 'Xóa user theo ID', security: [{ bearerAuth: [] }], parameters: [{ $ref: '#/components/parameters/IdParamInteger' }], responses: { 204: { description: 'No Content' } } } },
  }, // end paths

  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    // security schemes first (used across endpoints)
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },

    // reusable parameters
    parameters: {
      IdParamInteger: {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'integer' },
        description: 'ID (integer)',
      },
    },

    // schemas: merge imported schemas then add small helper schemas
    schemas: {
      ...AuthSchema,
      ...DomainSchema,

      // helper schemas (kept small; use only if DomainSchema không cung cấp)
      PhongChieuRequest: {
        type: 'object',
        properties: {
          rap_id: { type: 'integer' },
          ten_phong: { type: 'string' },
          suc_chua: { type: 'integer' },
        },
        required: ['rap_id', 'ten_phong', 'suc_chua'],
      },

      DatVeRequest: {
        type: 'object',
        properties: {
          khach_hang_id: { type: 'integer' },
          tong_tien: { type: 'number' },
          trang_thai_Dat_Ve: { type: 'string' },
          tickets: { type: 'array', items: { type: 'object' } },
        },
      },

      // LoaiPhim / LoaiNgay / CaChieu / DaoDien / DienVien / NhaSanXuat / LoaiGhe / VaiDien / DanhGia / DonHangDoAn
      LoaiPhimCreateRequest: { type: 'object', properties: { ten_loai: { type: 'string' }, mo_ta: { type: 'string' } }, required: ['ten_loai'] },
      LoaiPhimUpdateRequest: { type: 'object', properties: { ten_loai: { type: 'string' }, mo_ta: { type: 'string' } } },

      LoaiNgayCreateRequest: { type: 'object', properties: { loai_ngay: { type: 'string' }, phu_phi: { type: 'number' } }, required: ['loai_ngay', 'phu_phi'] },
      LoaiNgayUpdateRequest: { type: 'object', properties: { loai_ngay: { type: 'string' }, phu_phi: { type: 'number' } } },

      CaChieuCreateRequest: { type: 'object', properties: { gio_bat_dau: { type: 'string' }, gio_ket_thuc: { type: 'string' } }, required: ['gio_bat_dau', 'gio_ket_thuc'] },
      CaChieuUpdateRequest: { type: 'object', properties: { gio_bat_dau: { type: 'string' }, gio_ket_thuc: { type: 'string' } } },

      DaoDienCreateRequest: { type: 'object', properties: { ho_ten: { type: 'string' }, ngay_sinh: { type: 'string', format: 'date-time' }, quoc_tich: { type: 'string' }, tieu_su: { type: 'string' }, hinh_anh: { type: 'string' } }, required: ['ho_ten'] },
      DaoDienUpdateRequest: { type: 'object', properties: { ho_ten: { type: 'string' }, ngay_sinh: { type: 'string', format: 'date-time' }, quoc_tich: { type: 'string' }, tieu_su: { type: 'string' }, hinh_anh: { type: 'string' } } },

      DienVienCreateRequest: { type: 'object', properties: { ho_ten: { type: 'string' }, gioi_tinh: { type: 'string' }, nghe_danh: { type: 'string' }, ngay_sinh: { type: 'string', format: 'date-time' }, quoc_tich: { type: 'string' }, tieu_su: { type: 'string' }, hinh_anh: { type: 'string' } }, required: ['ho_ten'] },
      DienVienUpdateRequest: { type: 'object', properties: { ho_ten: { type: 'string' }, gioi_tinh: { type: 'string' }, nghe_danh: { type: 'string' }, ngay_sinh: { type: 'string', format: 'date-time' }, quoc_tich: { type: 'string' }, tieu_su: { type: 'string' }, hinh_anh: { type: 'string' } } },

      NhaSanXuatCreateRequest: { type: 'object', properties: { ten_nha_san_xuat: { type: 'string' }, quoc_gia: { type: 'string' } }, required: ['ten_nha_san_xuat'] },
      NhaSanXuatUpdateRequest: { type: 'object', properties: { ten_nha_san_xuat: { type: 'string' }, quoc_gia: { type: 'string' } } },

      LoaiGheCreateRequest: { type: 'object', properties: { ten_loai: { type: 'string' }, phu_phi: { type: 'number' } }, required: ['ten_loai', 'phu_phi'] },
      LoaiGheUpdateRequest: { type: 'object', properties: { ten_loai: { type: 'string' }, phu_phi: { type: 'number' } } },

      VaiDienCreateRequest: { type: 'object', properties: { dien_vien_id: { type: 'integer' }, phim_id: { type: 'integer' }, ten_vai_dien: { type: 'string' }, hinh_anh: { type: 'string' }, mo_ta: { type: 'string' } }, required: ['dien_vien_id', 'phim_id'] },
      VaiDienUpdateRequest: { type: 'object', properties: { dien_vien_id: { type: 'integer' }, phim_id: { type: 'integer' }, ten_vai_dien: { type: 'string' }, hinh_anh: { type: 'string' }, mo_ta: { type: 'string' } } },

      DanhGiaCreateRequest: { type: 'object', properties: { ve_id: { type: 'integer' }, khach_hang_id: { type: 'integer' }, phim_id: { type: 'integer' }, noi_dung: { type: 'string' }, diem_rating: { type: 'integer', minimum: 1, maximum: 10 } }, required: ['ve_id', 'khach_hang_id', 'phim_id', 'diem_rating'] },
      DanhGiaUpdateRequest: { type: 'object', properties: { ve_id: { type: 'integer' }, khach_hang_id: { type: 'integer' }, phim_id: { type: 'integer' }, noi_dung: { type: 'string' }, diem_rating: { type: 'integer', minimum: 1, maximum: 10 } } },

      DonHangDoAnCreateRequest: { type: 'object', properties: { Dat_Ve_id: { type: 'integer' }, Do_An_id: { type: 'integer' }, so_luong: { type: 'integer', minimum: 1 } }, required: ['Dat_Ve_id', 'Do_An_id', 'so_luong'] },
      DonHangDoAnUpdateRequest: { type: 'object', properties: { Dat_Ve_id: { type: 'integer' }, Do_An_id: { type: 'integer' }, so_luong: { type: 'integer', minimum: 1 } } },
    }, // end schemas
  }, // end components
};

export default swaggerDocument;
