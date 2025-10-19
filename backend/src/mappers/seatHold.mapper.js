export function toSeatHoldDto(sh) {
  if (!sh) return null;
  return {
    seat_hold_id: sh.seat_hold_id,
    user_id: sh.user_id,
    suat_chieu_id: sh.suat_chieu_id,
    ghe_id: sh.ghe_id,
    hold_token: sh.hold_token,
    expires_at: sh.expires_at,
    status: sh.status,
    created_at: sh.createdAt,
    updated_at: sh.updatedAt,
  };
}

export function toSeatHoldListDto(list) {
  return list.map(toSeatHoldDto);
}
export const toDto = (s) => ({
  // TODO
});

export default { toDto };
