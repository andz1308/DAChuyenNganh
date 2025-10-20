import svc from '../services/donHangDoAn.service.js';
const create = async (req,res)=>{try{const item=await svc.create(req.body);res.status(201).json(item);}catch(e){console.error(e);res.status(500).json({message:'Lỗi hệ thống'});}};
const list = async (req,res)=>{try{const items=await svc.list(req.query);res.json(items);}catch(e){console.error(e);res.status(500).json({message:'Lỗi hệ thống'});}};
const get = async (req,res)=>{try{const item=await svc.getById(req.params.id);if(!item)return res.status(404).json({message:'Không tìm thấy'});res.json(item);}catch(e){console.error(e);res.status(500).json({message:'Lỗi hệ thống'});}};
const update = async (req,res)=>{try{const item=await svc.update(req.params.id,req.body);if(!item)return res.status(404).json({message:'Không tìm thấy'});res.json(item);}catch(e){console.error(e);res.status(500).json({message:'Lỗi hệ thống'});}};
const remove = async (req,res)=>{try{const ok=await svc.remove(req.params.id);if(!ok)return res.status(404).json({message:'Không tìm thấy'});res.json({message:'Xóa thành công'});}catch(e){console.error(e);res.status(500).json({message:'Lỗi hệ thống'});}};
export default { create, list, get, update, remove };
