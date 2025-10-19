import { MailType } from '../constants/mail.constant.js';
import AuthSchema from '../schemas/auth.schema.js';
const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'RagDB API',
        version: '1.0.0',
    },
    servers: [
        {
            url: 'http://localhost:8080',       // Dev local
            description: 'Local Development',
        },
        {
            url: '/projects/ragdb',     // Prod qua Nginx
            description: 'Production - Techleaf',
        },
    ],
    paths: {
        // -------------------- Auth APIs ------------------- -
        '/api/auth/register': {
            post: {
                tags: ['Auths'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: AuthSchema.RegisterRequest,
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Đăng ký thành công',
                    },
                    400: {
                        description: 'Sai dữ liệu đầu vào',
                    },
                },
            },
        },
        '/api/auth/login': {
            post: {
                tags: ['Auths'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: AuthSchema.LoginRequest,
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'Đăng nhập thành công',
                    },
                    400: {
                        description: 'Dữ liệu không hợp lệ',
                    },
                }
            }
        },
        '/api/auth/reset-password': {
            put: {
                tags: ['Auths'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: AuthSchema.ResetPasswordRequest,
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'Đặt lại mật khẩu thành công'
                    },
                    400: {
                        description: 'Dữ liệu không hợp lệ'
                    }
                }
            }
        },
        '/api/auth/update-password': {
            put: {
                tags: ['Auths'],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: AuthSchema.UpdatePasswordRequest,
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'Cập nhật mật khẩu thành công'
                    },
                    400: {
                        description: 'Dữ liệu không hợp lệ'
                    },
                }
            }
        },
        "/api/auth/refresh-token": {
            post: {
                tags: ["Auths"],
                summary: "Làm mới token",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: AuthSchema.RefreshTokenRequest,
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Trả về access token mới",
                    },
                }
            }
        },
        "/api/auth/send-otp": {
            post: {
                tags: ["Auths"],
                summary: "Gửi OTP về email",
                description: "Gửi OTP theo loại mail (MailType).",
                parameters: [
                    {
                        name: "type",
                        in: "query",
                        required: true,
                        schema: {
                            type: "string",
                            enum: [MailType.RESET_PASSWORD, MailType.SIGN_UP],
                        },
                        description: "Loại OTP cần gửi",
                        example: "RESET_PASSWORD"
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: AuthSchema.SendOtpRequest
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Gửi OTP thành công",
                    },
                    400: {
                        description: "Dữ liệu không hợp lệ hoặc type sai",
                    },
                    500: {
                        description: "Lỗi hệ thống",
                    }
                }
            }
        },
        "/api/auth/logout": {
            post: {
                tags: ["Auths"],
                summary: "Đăng xuất",
                description: "Thu hồi refresh token và đăng xuất người dùng.",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: AuthSchema.LogoutRequest
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Đăng xuất thành công, refresh token đã bị thu hồi",
                    },
                    400: {
                        description: "Dữ liệu không hợp lệ hoặc thiếu refreshToken",
                    },
                    401: {
                        description: "Token không hợp lệ hoặc đã hết hạn",
                    },
                    500: {
                        description: "Lỗi hệ thống",
                    }
                }
            }
        },


        // -------------------- Users APIs ------------------- -
        '/api/users/load': {
            get: {
                tags: ['Users'],
                summary: 'Lấy thông tin user hiện tại',
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: 'Thông tin user',
                        content: { 'application/json': { schema: AuthSchema.UserInfoRequest } }
                    },
                    401: { description: 'Chưa đăng nhập hoặc token không hợp lệ' }
                }
            }
        },
        '/api/users/update': {
            put: {
                tags: ['Users'],
                summary: 'Cập nhật thông tin user hiện tại',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: AuthSchema.UserUpdateRequest } }
                },
                responses: {
                    200: {
                        description: 'Cập nhật thành công',
                        content: { 'application/json': { schema: AuthSchema.UserInfoRequest } }
                    },
                    400: { description: 'Dữ liệu không hợp lệ' },
                    401: { description: 'Chưa đăng nhập hoặc token không hợp lệ' }
                }
            }
        },

        // -------------------- Upload APIs ------------------- -
        "/api/upload/singleFile": {
            post: {
                tags: ["Upload"],
                summary: "Upload file",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    file: {
                                        type: "string",
                                        format: "binary"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: { description: "Upload file thành công" },
                    400: { description: "Lỗi upload" }
                }
            }
        },
        // -------------------- Database APIs -------------------- //
        '/api/databases/create': {
            post: {
                tags: ['Databases'],
                summary: 'Tạo database mới',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: AuthSchema.DatabaseCreateRequest,
                        },
                    },
                },
                responses: {
                    201: { description: 'Tạo database thành công' },
                    400: { description: 'Dữ liệu không hợp lệ' },
                },
            },
        },

        '/api/databases/my-databases': {
            get: {
                tags: ['Databases'],
                summary: 'Lấy tất cả databases của user hiện tại',
                security: [{ bearerAuth: [] }],
                responses: {
                    200: { description: 'Danh sách database' },
                    401: { description: 'Chưa đăng nhập hoặc token không hợp lệ' },
                },
            },
        },

        '/api/databases/detail/{id}': {
            get: {
                tags: ['Databases'],
                summary: 'Lấy chi tiết database theo ID',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID của database',
                    },
                ],
                responses: {
                    200: { description: 'Chi tiết database' },
                    404: { description: 'Không tìm thấy database' },
                },
            },
        },

        '/api/databases/update/{id}': {
            put: {
                tags: ['Databases'],
                summary: 'Cập nhật database',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID của database cần update',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: AuthSchema.DatabaseUpdateRequest,
                        },
                    },
                },
                responses: {
                    200: { description: 'Cập nhật thành công' },
                    400: { description: 'Dữ liệu không hợp lệ' },
                },
            },
        },

        '/api/databases/delete/{id}': {
            delete: {
                tags: ['Databases'],
                summary: 'Xóa database theo ID',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID của database cần xóa',
                    },
                ],
                responses: {
                    200: { description: 'Xóa thành công' },
                    404: { description: 'Không tìm thấy database' },
                },
            },
        },
        // -------------------- Admin APIs -------------------- //

        // Tạo account mới
        '/api/admin/create': {
            post: {
                tags: ['Admin'],
                summary: 'Admin tạo account mới',
                description: 'Admin tạo tài khoản mới cho user (gửi mail kích hoạt).',
                security: [{ bearerAuth: [] }],
                requestBody: {
                required: true,
                content: {
                    'application/json': {
                    schema: AuthSchema.AdminCreateAccountRequest,
                    },
                },
                },
                responses: {
                201: { description: 'Tạo account thành công' },
                400: { description: 'Dữ liệu không hợp lệ' },
                401: { description: 'Không có quyền' },
                },
            },
        },

        // Lấy danh sách tất cả users
        '/api/admin/showall': {
            get: {
                tags: ['Admin'],
                summary: 'Admin lấy danh sách tất cả users',
                security: [{ bearerAuth: [] }],
                responses: {
                200: { description: 'Danh sách users' },
                401: { description: 'Không có quyền' },
                },
            },
        },

        // Lấy thông tin user theo ID
        '/api/admin/show/{id}': {
            get: {
                tags: ['Admin'],
                summary: 'Admin lấy thông tin user theo ID',
                security: [{ bearerAuth: [] }],
                parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'ID của user',
                },
                ],
                responses: {
                200: { description: 'Thông tin user' },
                404: { description: 'Không tìm thấy user' },
                },
            },
        },

        // Cập nhật thông tin user theo ID
        '/api/admin/update/{id}': {
            put: {
                tags: ['Admin'],
                summary: 'Admin cập nhật thông tin user theo ID',
                security: [{ bearerAuth: [] }],
                parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'ID của user',
                },
                ],
                requestBody: {
                required: true,
                content: {
                    'application/json': {
                    schema: AuthSchema.AdminUpdateAccountRequest,
                    },
                },
                },
                responses: {
                200: { description: 'Cập nhật thành công' },
                400: { description: 'Dữ liệu không hợp lệ' },
                },
            },
        },

        // Xóa user theo ID
        '/api/admin/delete/{id}': {
            delete: {
                tags: ['Admin'],
                summary: 'Admin xóa user theo ID',
                security: [{ bearerAuth: [] }],
                parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'ID của user cần xóa',
                },
                ],
                responses: {
                200: { description: 'Xóa thành công' },
                404: { description: 'Không tìm thấy user' },
            },
        },
    },

    },

    components: {
        schemas: {
            ...AuthSchema,
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },

    },
};

export default swaggerDocument;
