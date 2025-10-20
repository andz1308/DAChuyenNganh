import { getModels } from '../models/index.js';

const create = (payload) => { const { DanhGia } = getModels(); return DanhGia.create(payload); };
const list = async (options = {}) => {
	const page = Math.max(parseInt(options.page) || 1, 1);
	const limit = Math.min(Math.max(parseInt(options.limit) || 10, 1), 100);
	const offset = (page - 1) * limit;
	const { DanhGia } = getModels();
	const { rows, count } = await DanhGia.findAndCountAll({ where: {}, limit, offset });
	return { rows, count, page, limit };
};
const getById = (id) => { const { DanhGia } = getModels(); return DanhGia.findByPk(id); };
const update = async (id, payload) => { const { DanhGia } = getModels(); const item = await DanhGia.findByPk(id); if (!item) return null; await item.update(payload); return item; };
const remove = async (id) => { const { DanhGia } = getModels(); const item = await DanhGia.findByPk(id); if (!item) return false; await item.destroy(); return true; };
export default { create, list, getById, update, remove };
