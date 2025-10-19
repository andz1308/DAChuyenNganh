import express from 'express';
import authRouter from './authRouter.js';
import userRouter from './userRouter.js';
import uploadRouter from './uploadRouter.js';
import adminRouter from './adminRouter.js';
import rapRouter from './rapRouter.js';
import phongChieuRouter from './phongChieuRouter.js';
import gheRouter from './gheRouter.js';
import phimRouter from './phimRouter.js';
import suatChieuRouter from './suatChieuRouter.js';
import datVeRouter from './datVeRouter.js';
import veRouter from './veRouter.js';
import khuyenMaiRouter from './khuyenMaiRouter.js';
import doAnRouter from './doAnRouter.js';
import staffRouter from './staffRouter.js';
import seatHoldRouter from './seatHoldRouter.js';

const rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
    res.send('Welcome to the API root!');
});

rootRouter.use('/auth', authRouter);
rootRouter.use('/users', userRouter);
rootRouter.use('/upload', uploadRouter);
rootRouter.use('/admin', adminRouter);
rootRouter.use('/raps', rapRouter);
rootRouter.use('/phong-chieu', phongChieuRouter);
rootRouter.use('/ghes', gheRouter);
rootRouter.use('/phims', phimRouter);
rootRouter.use('/suat-chieu', suatChieuRouter);
rootRouter.use('/dat-ve', datVeRouter);
rootRouter.use('/ves', veRouter);
rootRouter.use('/khuyen-mai', khuyenMaiRouter);
rootRouter.use('/do-an', doAnRouter);
rootRouter.use('/staff', staffRouter);
rootRouter.use('/seat-holds', seatHoldRouter);

export default rootRouter;