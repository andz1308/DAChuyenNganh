export const toDto = (phong) => ({
  phong_chieu_id: phong.phong_chieu_id,
  rap_id: phong.rap_id,
  ten_phong: phong.ten_phong,
  suc_chua: phong.suc_chua,
  createdAt: phong.createdAt,
  updatedAt: phong.updatedAt,
});

export default { toDto };
