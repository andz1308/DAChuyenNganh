import { DataTypes, Sequelize } from 'sequelize';
import { getSequelize } from '../config/mysql.js';

const initModels = (sequelize) => {
    // Consolidated User model: replaces previous NhanVien and KhachHang tables
    // Use integer PK to match existing FK usage in other tables (Dat_Ve, Danh_Gia, ...)
    const User = sequelize.define('User', {
        user_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        ho_ten: { type: DataTypes.STRING, allowNull: false },
        ngay_sinh: { type: DataTypes.DATE },
        gioi_tinh: { type: DataTypes.STRING(10) },
        so_dien_thoai: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        dia_chi: { type: DataTypes.STRING },
        ngay_vao_lam: { type: DataTypes.DATE },
        password: { type: DataTypes.STRING },
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
        role_id: { type: DataTypes.INTEGER },
    }, { timestamps: true });

    const RefreshToken = sequelize.define('RefreshToken', {
        id: { type: DataTypes.STRING, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4 },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        tokenHash: { type: DataTypes.STRING, allowNull: false, unique: true },
        expiresAt: { type: DataTypes.DATE, allowNull: false },
        createdByIp: { type: DataTypes.STRING },
        revokedAt: { type: DataTypes.DATE },
        revokedByIp: { type: DataTypes.STRING },
        replacedByTokenHash: { type: DataTypes.STRING },
        device: { type: DataTypes.STRING },
    }, { timestamps: true });

    const Otp = sequelize.define('Otp', {
        id: { type: DataTypes.STRING, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4 },
        email: { type: DataTypes.STRING, allowNull: false },
        otp: { type: DataTypes.STRING, allowNull: false },
        expiresAt: { type: DataTypes.DATE, allowNull: false },
    }, { timestamps: false });

    // Additional models derived from provided SQL schema
    const Rap = sequelize.define('Rap', {
        rap_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        ten_rap: { type: DataTypes.STRING, allowNull: false },
        dia_chi: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        mo_ta: { type: DataTypes.TEXT },
    }, { timestamps: false });

    const PhongChieu = sequelize.define('PhongChieu', {
        phong_chieu_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        rap_id: { type: DataTypes.INTEGER, allowNull: false },
        ten_phong: { type: DataTypes.STRING(50), allowNull: false },
        suc_chua: { type: DataTypes.INTEGER, allowNull: false },
    }, { timestamps: false });

    const LoaiGhe = sequelize.define('LoaiGhe', {
        loaighe_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        ten_loai: { type: DataTypes.STRING(100) },
        phu_phi: { type: DataTypes.DECIMAL(10,2) },
    }, { timestamps: false });

    const Ghe = sequelize.define('Ghe', {
        ghe_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        phong_chieu_id: { type: DataTypes.INTEGER, allowNull: false },
        so_ghe: { type: DataTypes.STRING(10), allowNull: false },
        loai_ghe_id: { type: DataTypes.INTEGER, allowNull: false },
        trang_thai: { type: DataTypes.INTEGER },
    }, { timestamps: false });

    const NhaSanXuat = sequelize.define('NhaSanXuat', {
        nha_san_xuat_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        ten_nha_san_xuat: { type: DataTypes.STRING(255), allowNull: false },
        quoc_gia: { type: DataTypes.STRING(100) },
    }, { timestamps: false });

    const DaoDien = sequelize.define('DaoDien', {
        daodien_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        ho_ten: { type: DataTypes.STRING(200) },
        ngay_sinh: { type: DataTypes.DATE },
        quoc_tich: { type: DataTypes.STRING(100) },
        tieu_su: { type: DataTypes.TEXT },
        hinh_anh: { type: DataTypes.STRING(255) },
    }, { timestamps: false });

    const DienVien = sequelize.define('DienVien', {
        dienvien_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        ho_ten: { type: DataTypes.STRING(200) },
        gioi_tinh: { type: DataTypes.STRING(10) },
        nghe_danh: { type: DataTypes.STRING(200) },
        ngay_sinh: { type: DataTypes.DATE },
        quoc_tich: { type: DataTypes.STRING(100) },
        tieu_su: { type: DataTypes.TEXT },
        hinh_anh: { type: DataTypes.STRING(255) },
    }, { timestamps: false });

    const LoaiPhim = sequelize.define('LoaiPhim', {
        loaiphim_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        ten_loai: { type: DataTypes.STRING(100) },
        mo_ta: { type: DataTypes.TEXT },
    }, { timestamps: false });

    const Phim = sequelize.define('Phim', {
        phim_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        ten_phim: { type: DataTypes.STRING(255), allowNull: false },
        dao_dien_id: { type: DataTypes.INTEGER },
        nha_san_xuat_id: { type: DataTypes.INTEGER },
        thoi_luong: { type: DataTypes.INTEGER },
        mo_ta: { type: DataTypes.TEXT },
        hinh_anh: { type: DataTypes.STRING(255) },
        video: { type: DataTypes.STRING(255) },
        ngay_khoi_chieu: { type: DataTypes.DATE },
    }, { timestamps: false });

    const VaiDien = sequelize.define('VaiDien', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        dien_vien_id: { type: DataTypes.INTEGER },
        phim_id: { type: DataTypes.INTEGER },
        ten_vai_dien: { type: DataTypes.STRING(200) },
        hinh_anh: { type: DataTypes.STRING(255) },
        mo_ta: { type: DataTypes.STRING(200) },
    }, { timestamps: false });

    const Phim_LoaiPhim = sequelize.define('Phim_LoaiPhim', {
        phim_id: { type: DataTypes.INTEGER, allowNull: false },
        loaiphim_id: { type: DataTypes.INTEGER, allowNull: false },
    }, { timestamps: false });

    const CaChieu = sequelize.define('CaChieu', {
        ca_chieu_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        gio_bat_dau: { type: DataTypes.TIME, allowNull: false },
        gio_ket_thuc: { type: DataTypes.TIME, allowNull: false },
    }, { timestamps: false });

    const LoaiNgay = sequelize.define('LoaiNgay', {
        loai_ngay_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        loai_ngay: { type: DataTypes.STRING(50), allowNull: false },
        phu_phi: { type: DataTypes.DECIMAL(3,2), allowNull: false },
    }, { timestamps: false });

    const SuatChieu = sequelize.define('SuatChieu', {
        suat_chieu_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        phim_id: { type: DataTypes.INTEGER, allowNull: false },
        phong_chieu_id: { type: DataTypes.INTEGER, allowNull: false },
        ca_chieu_id: { type: DataTypes.INTEGER, allowNull: false },
        ngay_chieu: { type: DataTypes.DATE, allowNull: false },
        loai_ngay_id: { type: DataTypes.INTEGER, allowNull: false },
        ngon_ngu: { type: DataTypes.STRING(50) },
        gia_ve: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    }, { timestamps: false });

    // Role model (used for authorization: ADMIN / STAFF / USER)
    const Role = sequelize.define('Role', {
        role_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        ten_role: { type: DataTypes.STRING(50) }
    }, { timestamps: false });

    const KhuyenMai = sequelize.define('KhuyenMai', {
        ma_giam_gia_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        loai_giam_gia: { type: DataTypes.STRING(50), allowNull: false },
        gia_tri_giam: { type: DataTypes.DECIMAL(10,2), allowNull: false },
        ngay_bat_dau: { type: DataTypes.DATE, allowNull: false },
        ngay_ket_thuc: { type: DataTypes.DATE, allowNull: false },
        trang_thai: { type: DataTypes.STRING(50), allowNull: false },
        so_luong_ban_dau: { type: DataTypes.INTEGER },
        so_luong_con_lai: { type: DataTypes.INTEGER },
        mo_ta: { type: DataTypes.TEXT },
    }, { timestamps: false });

    const DatVe = sequelize.define('DatVe', {
        Dat_Ve_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        khach_hang_id: { type: DataTypes.INTEGER, allowNull: false },
        nhan_vien_id: { type: DataTypes.INTEGER },
        ngay_tao: { type: DataTypes.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        tong_tien: { type: DataTypes.DECIMAL(10,2), allowNull: false },
        trang_thai_Dat_Ve: { type: DataTypes.STRING(50), allowNull: false },
        ma_giam_gia_id: { type: DataTypes.INTEGER },
    }, { timestamps: false });

    const Ve = sequelize.define('Ve', {
        ve_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        ghe_id: { type: DataTypes.INTEGER, allowNull: false },
        Dat_Ve_id: { type: DataTypes.INTEGER, allowNull: false },
        suat_chieu_id: { type: DataTypes.INTEGER, allowNull: false },
        ma_qr_code: { type: DataTypes.STRING(255), unique: true, allowNull: false },
        trang_thai_ve: { type: DataTypes.STRING(50), allowNull: false },
        gia_ve: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    }, { timestamps: false });

    const DoAn = sequelize.define('DoAn', {
        Do_An_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        ten_san_pham: { type: DataTypes.STRING(200) },
        mo_ta: { type: DataTypes.TEXT },
        loai: { type: DataTypes.STRING(50) },
        gia: { type: DataTypes.DECIMAL(12,2) },
    }, { timestamps: false });

    const DonHangDoAn = sequelize.define('DonHangDoAn', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        Dat_Ve_id: { type: DataTypes.INTEGER, allowNull: false },
        Do_An_id: { type: DataTypes.INTEGER, allowNull: false },
        so_luong: { type: DataTypes.INTEGER, allowNull: false },
    }, { timestamps: false });

    const DanhGia = sequelize.define('DanhGia', {
        Danh_Gia_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        ve_id: { type: DataTypes.INTEGER, allowNull: false },
        khach_hang_id: { type: DataTypes.INTEGER, allowNull: false },
        phim_id: { type: DataTypes.INTEGER, allowNull: false },
        noi_dung: { type: DataTypes.TEXT },
        diem_rating: { type: DataTypes.INTEGER },
        ngay_Danh_Gia: { type: DataTypes.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    }, { timestamps: false });

    // SeatHold: temporary reservation of a seat for a showtime (holds before checkout)
    const SeatHold = sequelize.define('SeatHold', {
        seat_hold_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER },
        suat_chieu_id: { type: DataTypes.INTEGER, allowNull: false },
        ghe_id: { type: DataTypes.INTEGER, allowNull: false },
        hold_token: { type: DataTypes.STRING(255), allowNull: false, unique: true },
        expires_at: { type: DataTypes.DATE, allowNull: false },
        status: { type: DataTypes.STRING(20), defaultValue: 'HOLD' },
    }, { timestamps: true });

    // Associations
    User.hasMany(RefreshToken, { foreignKey: 'userId', sourceKey: 'user_id', as: 'refreshTokens', onDelete: 'CASCADE' });
    RefreshToken.belongsTo(User, { foreignKey: 'userId', targetKey: 'user_id', as: 'user' });

    // Rap -> PhongChieu
    Rap.hasMany(PhongChieu, { foreignKey: 'rap_id', sourceKey: 'rap_id', as: 'phongChieus', onDelete: 'CASCADE' });
    PhongChieu.belongsTo(Rap, { foreignKey: 'rap_id', targetKey: 'rap_id', as: 'rap' });

    // PhongChieu -> Ghe
    PhongChieu.hasMany(Ghe, { foreignKey: 'phong_chieu_id', sourceKey: 'phong_chieu_id', as: 'ghes', onDelete: 'CASCADE' });
    Ghe.belongsTo(PhongChieu, { foreignKey: 'phong_chieu_id', targetKey: 'phong_chieu_id', as: 'phongChieu' });

    // LoaiGhe -> Ghe
    LoaiGhe.hasMany(Ghe, { foreignKey: 'loai_ghe_id', sourceKey: 'loaighe_id', as: 'ghes' });
    Ghe.belongsTo(LoaiGhe, { foreignKey: 'loai_ghe_id', targetKey: 'loaighe_id', as: 'loaiGhe' });

    // DienVien <-> VaiDien, Phim <-> VaiDien
    DienVien.hasMany(VaiDien, { foreignKey: 'dien_vien_id', sourceKey: 'dienvien_id', as: 'vaiDiens' });
    VaiDien.belongsTo(DienVien, { foreignKey: 'dien_vien_id', targetKey: 'dienvien_id', as: 'dienVien' });
    Phim.hasMany(VaiDien, { foreignKey: 'phim_id', sourceKey: 'phim_id', as: 'vaiDiens' });
    VaiDien.belongsTo(Phim, { foreignKey: 'phim_id', targetKey: 'phim_id', as: 'phim' });

    // Phim -> DaoDien, Phim -> NhaSanXuat
    DaoDien.hasMany(Phim, { foreignKey: 'dao_dien_id', sourceKey: 'daodien_id', as: 'phims' });
    Phim.belongsTo(DaoDien, { foreignKey: 'dao_dien_id', targetKey: 'daodien_id', as: 'daoDien' });
    NhaSanXuat.hasMany(Phim, { foreignKey: 'nha_san_xuat_id', sourceKey: 'nha_san_xuat_id', as: 'phims' });
    Phim.belongsTo(NhaSanXuat, { foreignKey: 'nha_san_xuat_id', targetKey: 'nha_san_xuat_id', as: 'nhaSanXuat' });

    // Phim <-> LoaiPhim (through Phim_LoaiPhim)
    Phim.belongsToMany(LoaiPhim, { through: Phim_LoaiPhim, foreignKey: 'phim_id', otherKey: 'loaiphim_id', as: 'loaiPhims' });
    LoaiPhim.belongsToMany(Phim, { through: Phim_LoaiPhim, foreignKey: 'loaiphim_id', otherKey: 'phim_id', as: 'phims' });

    // SuatChieu associations
    Phim.hasMany(SuatChieu, { foreignKey: 'phim_id', sourceKey: 'phim_id', as: 'suatChieus' });
    SuatChieu.belongsTo(Phim, { foreignKey: 'phim_id', targetKey: 'phim_id', as: 'phim' });
    PhongChieu.hasMany(SuatChieu, { foreignKey: 'phong_chieu_id', sourceKey: 'phong_chieu_id', as: 'suatChieus' });
    SuatChieu.belongsTo(PhongChieu, { foreignKey: 'phong_chieu_id', targetKey: 'phong_chieu_id', as: 'phongChieu' });
    CaChieu.hasMany(SuatChieu, { foreignKey: 'ca_chieu_id', sourceKey: 'ca_chieu_id', as: 'suatChieus' });
    SuatChieu.belongsTo(CaChieu, { foreignKey: 'ca_chieu_id', targetKey: 'ca_chieu_id', as: 'caChieu' });
    LoaiNgay.hasMany(SuatChieu, { foreignKey: 'loai_ngay_id', sourceKey: 'loai_ngay_id', as: 'suatChieus' });
    SuatChieu.belongsTo(LoaiNgay, { foreignKey: 'loai_ngay_id', targetKey: 'loai_ngay_id', as: 'loaiNgay' });

    // DatVe -> User (as KhachHang and NhanVien), KhuyenMai
    // A DatVe record has a khach_hang_id and optional nhan_vien_id pointing to User.user_id
    User.hasMany(DatVe, { foreignKey: 'khach_hang_id', sourceKey: 'user_id', as: 'datVesAsCustomer' });
    DatVe.belongsTo(User, { foreignKey: 'khach_hang_id', targetKey: 'user_id', as: 'khachHang' });
    User.hasMany(DatVe, { foreignKey: 'nhan_vien_id', sourceKey: 'user_id', as: 'datVesAsStaff' });
    DatVe.belongsTo(User, { foreignKey: 'nhan_vien_id', targetKey: 'user_id', as: 'nhanVien' });
    KhuyenMai.hasMany(DatVe, { foreignKey: 'ma_giam_gia_id', sourceKey: 'ma_giam_gia_id', as: 'datVes' });
    DatVe.belongsTo(KhuyenMai, { foreignKey: 'ma_giam_gia_id', targetKey: 'ma_giam_gia_id', as: 'khuyenMai' });

    // Role <-> User
    Role.hasMany(User, { foreignKey: 'role_id', sourceKey: 'role_id', as: 'users' });
    User.belongsTo(Role, { foreignKey: 'role_id', targetKey: 'role_id', as: 'role' });

    // Ve -> DatVe, SuatChieu, Ghe
    DatVe.hasMany(Ve, { foreignKey: 'Dat_Ve_id', sourceKey: 'Dat_Ve_id', as: 'ves' });
    Ve.belongsTo(DatVe, { foreignKey: 'Dat_Ve_id', targetKey: 'Dat_Ve_id', as: 'datVe' });
    SuatChieu.hasMany(Ve, { foreignKey: 'suat_chieu_id', sourceKey: 'suat_chieu_id', as: 'ves' });
    Ve.belongsTo(SuatChieu, { foreignKey: 'suat_chieu_id', targetKey: 'suat_chieu_id', as: 'suatChieu' });
    Ghe.hasMany(Ve, { foreignKey: 'ghe_id', sourceKey: 'ghe_id', as: 'ves' });
    Ve.belongsTo(Ghe, { foreignKey: 'ghe_id', targetKey: 'ghe_id', as: 'ghe' });

    // DonHangDoAn -> DatVe, DoAn
    DatVe.hasMany(DonHangDoAn, { foreignKey: 'Dat_Ve_id', sourceKey: 'Dat_Ve_id', as: 'donHangDoAns' });
    DonHangDoAn.belongsTo(DatVe, { foreignKey: 'Dat_Ve_id', targetKey: 'Dat_Ve_id', as: 'datVe' });
    DoAn.hasMany(DonHangDoAn, { foreignKey: 'Do_An_id', sourceKey: 'Do_An_id', as: 'donHangDoAns' });
    DonHangDoAn.belongsTo(DoAn, { foreignKey: 'Do_An_id', targetKey: 'Do_An_id', as: 'doAn' });

    // DanhGia -> Ve, User (as KhachHang), Phim
    Ve.hasMany(DanhGia, { foreignKey: 've_id', sourceKey: 've_id', as: 'danhGias' });
    DanhGia.belongsTo(Ve, { foreignKey: 've_id', targetKey: 've_id', as: 've' });
    User.hasMany(DanhGia, { foreignKey: 'khach_hang_id', sourceKey: 'user_id', as: 'danhGias' });
    DanhGia.belongsTo(User, { foreignKey: 'khach_hang_id', targetKey: 'user_id', as: 'khachHang' });
    Phim.hasMany(DanhGia, { foreignKey: 'phim_id', sourceKey: 'phim_id', as: 'danhGias' });
    DanhGia.belongsTo(Phim, { foreignKey: 'phim_id', targetKey: 'phim_id', as: 'phim' });

    return {
        User,
        RefreshToken,
        Otp,
        Rap,
        PhongChieu,
        LoaiGhe,
        Ghe,
        NhaSanXuat,
        DaoDien,
        DienVien,
        LoaiPhim,
        Phim,
        VaiDien,
        Phim_LoaiPhim,
        CaChieu,
        LoaiNgay,
        SuatChieu,
        KhuyenMai,
        DatVe,
        Ve,
        DoAn,
        DonHangDoAn,
        DanhGia
    };
};

let models = null;

const getModels = () => {
    if (!models) {
        const sequelize = getSequelize();
        if (!sequelize) throw new Error('Sequelize not initialized');
        models = initModels(sequelize);
    }
    return models;
};

export { initModels, getModels };
