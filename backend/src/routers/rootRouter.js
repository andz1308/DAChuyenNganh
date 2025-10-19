import express from 'express';
import authRouter from './authRouter.js';
import userRouter from './userRouter.js';
import uploadRouter from './uploadRouter.js';
import databaseRouter from './databaseRouter.js';
import adminRouter from './adminRouter.js';

const rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
    res.send('Welcome to the API root!');
});

rootRouter.use('/auth', authRouter);
rootRouter.use('/users', userRouter);
rootRouter.use('/upload', uploadRouter);
rootRouter.use('/databases', databaseRouter);
rootRouter.use('/admin', adminRouter);

export default rootRouter;