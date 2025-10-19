export function toStaffDto(user) {
  if (!user) return null;
  return {
    user_id: user.user_id,
    ho_ten: user.ho_ten,
    email: user.email,
    so_dien_thoai: user.so_dien_thoai,
    dia_chi: user.dia_chi,
    role_id: user.role_id,
    created_at: user.createdAt,
    updated_at: user.updatedAt,
  };
}

export function toStaffListDto(users) {
  return users.map(toStaffDto);
}
export const toDto = (user) => ({
  // TODO: map user fields for staff
});

export default { toDto };
