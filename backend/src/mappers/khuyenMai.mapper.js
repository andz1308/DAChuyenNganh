export const toDto = (k) => ({
  ma_giam_gia_id: k.ma_giam_gia_id,
  loai_giam_gia: k.loai_giam_gia,
  gia_tri_giam: k.gia_tri_giam,
  ngay_bat_dau: k.ngay_bat_dau,
  ngay_ket_thuc: k.ngay_ket_thuc,
  trang_thai: k.trang_thai,
  so_luong_ban_dau: k.so_luong_ban_dau,
  so_luong_con_lai: k.so_luong_con_lai,
  mo_ta: k.mo_ta,
});

export default { toDto };
