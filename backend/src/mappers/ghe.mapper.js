export const toDto = (ghe) => ({
  ghe_id: ghe.ghe_id,
  phong_chieu_id: ghe.phong_chieu_id,
  so_ghe: ghe.so_ghe,
  loai_ghe_id: ghe.loai_ghe_id,
  trang_thai: ghe.trang_thai,
  createdAt: ghe.createdAt,
  updatedAt: ghe.updatedAt,
});

export default { toDto };
