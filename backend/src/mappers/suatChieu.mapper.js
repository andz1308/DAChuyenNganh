export const toDto = (s) => ({
  suat_chieu_id: s.suat_chieu_id,
  phim_id: s.phim_id,
  phong_chieu_id: s.phong_chieu_id,
  ca_chieu_id: s.ca_chieu_id,
  ngay_chieu: s.ngay_chieu,
  loai_ngay_id: s.loai_ngay_id,
  ngon_ngu: s.ngon_ngu,
  gia_ve: s.gia_ve,
});

export default { toDto };
