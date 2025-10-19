/**
 * Model skeleton for NhanVien
 * NOTE: If you consolidate NhanVien into User, this file can be removed/left as backup.
 * TODO: Add attributes based on SQL schema (nhanvien_id, ho_ten, ngay_sinh, gioi_tinh, so_dien_thoai, email, dia_chi, role_id, ngay_vao_lam, trang_thai)
 */
export default (sequelize, DataTypes) => {
  return sequelize.define('NhanVien', {
    // TODO: define attributes
  }, { timestamps: false });
};
