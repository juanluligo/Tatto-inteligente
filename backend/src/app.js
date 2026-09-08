import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import { errorHandler, notFound } from './middlewares/error.middleware.js';
import healthRouter from './routes/health.routes.js';

const app = express();

app.use(cors({ origin: env.clientUrl }));
app.use(express.json());
app.get('/', (_request, response) => response.json({ name: 'TattooStudio API', status: 'online' }));
app.use('/api', healthRouter);
app.use(notFound);
app.use(errorHandler);

export default app;
