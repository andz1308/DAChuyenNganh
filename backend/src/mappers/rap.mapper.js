// Mapping functions for Rap
export const toDto = (rap) => ({
  rap_id: rap.rap_id,
  ten_rap: rap.ten_rap,
  dia_chi: rap.dia_chi,
  email: rap.email,
  mo_ta: rap.mo_ta,
});

export default { toDto };
