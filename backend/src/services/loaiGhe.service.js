import { getModels } from '../models/index.js';
const { LoaiGhe } = getModels();

const create = (payload) => LoaiGhe.create(payload);
const list = async (options = {}) => {
	const page = Math.max(parseInt(options.page) || 1, 1);
	const limit = Math.min(Math.max(parseInt(options.limit) || 10, 1), 100);
	const offset = (page - 1) * limit;
	const where = {};
	const { rows, count } = await LoaiGhe.findAndCountAll({ where, limit, offset });
	return { rows, count, page, limit };
};
const getById = (id) => LoaiGhe.findByPk(id);
const update = async (id, payload) => { const item = await LoaiGhe.findByPk(id); if (!item) return null; await item.update(payload); return item; };
const remove = async (id) => { const item = await LoaiGhe.findByPk(id); if (!item) return false; await item.destroy(); return true; };
export default { create, list, getById, update, remove };
