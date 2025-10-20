import joiToSwagger from 'joi-to-swagger';

// Auth and User/Admin
import { userInfoSchema, userUpdateSchema } from '../validations/user.validation.js';
import { createAccountSchema, updateAccountSchema } from '../validations/admin.validation.js';

// Domain validations
import { createRapSchema, updateRapSchema } from '../validations/rap.validation.js';
import { createPhongChieuSchema, updatePhongChieuSchema } from '../validations/phongChieu.validation.js';
import { createPhimSchema, updatePhimSchema } from '../validations/phim.validation.js';
import { createSuatChieuSchema, updateSuatChieuSchema } from '../validations/suatChieu.validation.js';
import { createDatVeSchema, updateDatVeSchema, ticketItemSchema } from '../validations/datVe.validation.js';
import { createGheSchema, updateGheSchema } from '../validations/ghe.validation.js';
import { createDoAnSchema, updateDoAnSchema } from '../validations/doAn.validation.js';
import { createKhuyenMaiSchema, updateKhuyenMaiSchema } from '../validations/khuyenMai.validation.js';
import { createSeatHoldSchema } from '../validations/seatHold.validation.js';
import { createStaffSchema } from '../validations/staff.validation.js';

// Convert with joi-to-swagger
const { swagger: UserInfo } = joiToSwagger(userInfoSchema);
const { swagger: UserUpdateRequest } = joiToSwagger(userUpdateSchema);
const { swagger: AdminCreateAccountRequest } = joiToSwagger(createAccountSchema);
const { swagger: AdminUpdateAccountRequest } = joiToSwagger(updateAccountSchema);

const { swagger: RapCreateRequest } = joiToSwagger(createRapSchema);
const { swagger: RapUpdateRequest } = joiToSwagger(updateRapSchema);

const { swagger: PhongChieuCreateRequest } = joiToSwagger(createPhongChieuSchema);
const { swagger: PhongChieuUpdateRequest } = joiToSwagger(updatePhongChieuSchema);

const { swagger: PhimCreateRequest } = joiToSwagger(createPhimSchema);
const { swagger: PhimUpdateRequest } = joiToSwagger(updatePhimSchema);

const { swagger: SuatChieuCreateRequest } = joiToSwagger(createSuatChieuSchema);
const { swagger: SuatChieuUpdateRequest } = joiToSwagger(updateSuatChieuSchema);

const { swagger: TicketItem } = joiToSwagger(ticketItemSchema);
const { swagger: DatVeCreateRequest } = joiToSwagger(createDatVeSchema);
const { swagger: DatVeUpdateRequest } = joiToSwagger(updateDatVeSchema);

const { swagger: GheCreateRequest } = joiToSwagger(createGheSchema);
const { swagger: GheUpdateRequest } = joiToSwagger(updateGheSchema);

const { swagger: DoAnCreateRequest } = joiToSwagger(createDoAnSchema);
const { swagger: DoAnUpdateRequest } = joiToSwagger(updateDoAnSchema);

const { swagger: KhuyenMaiCreateRequest } = joiToSwagger(createKhuyenMaiSchema);
const { swagger: KhuyenMaiUpdateRequest } = joiToSwagger(updateKhuyenMaiSchema);

const { swagger: SeatHoldCreateRequest } = joiToSwagger(createSeatHoldSchema);
const { swagger: StaffCreateRequest } = joiToSwagger(createStaffSchema);

export default {
  // General/User/Admin
  UserInfo,
  UserUpdateRequest,
  AdminCreateAccountRequest,
  AdminUpdateAccountRequest,
  // Rap
  RapCreateRequest,
  RapUpdateRequest,
  // PhongChieu
  PhongChieuCreateRequest,
  PhongChieuUpdateRequest,
  // Phim
  PhimCreateRequest,
  PhimUpdateRequest,
  // SuatChieu
  SuatChieuCreateRequest,
  SuatChieuUpdateRequest,
  // DatVe
  TicketItem,
  DatVeCreateRequest,
  DatVeUpdateRequest,
  // Ghe
  GheCreateRequest,
  GheUpdateRequest,
  // DoAn
  DoAnCreateRequest,
  DoAnUpdateRequest,
  // KhuyenMai
  KhuyenMaiCreateRequest,
  KhuyenMaiUpdateRequest,
  // SeatHold
  SeatHoldCreateRequest,
  // Staff
  StaffCreateRequest,
};
