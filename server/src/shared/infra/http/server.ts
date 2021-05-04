import 'reflect-metadata';
import 'dotenv/config';
import { errors } from 'celebrate';
import cors from 'cors';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import routes from './routes/index';
import rateLimiter from './middlewares/RateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);

app.use(errors());
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
});

app.listen(PORT, () => {
    console.log(`Servidor levantado na porta ${PORT}`);
});
