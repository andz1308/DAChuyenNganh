export const toDto = (phim) => ({
  phim_id: phim.phim_id,
  ten_phim: phim.ten_phim,
  dao_dien_id: phim.dao_dien_id,
  nha_san_xuat_id: phim.nha_san_xuat_id,
  thoi_luong: phim.thoi_luong,
  mo_ta: phim.mo_ta,
  hinh_anh: phim.hinh_anh,
  video: phim.video,
  ngay_khoi_chieu: phim.ngay_khoi_chieu,
});

export default { toDto };
