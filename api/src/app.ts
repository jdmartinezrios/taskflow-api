import express from 'express';
import { checkDatabaseConnection } from './config/database';
import tasksRouter from './routes/tasks';

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/health', async (_req, res) => {
    const dbConnected = await checkDatabaseConnection();
    res.status(dbConnected ? 200 : 503).json({
      status: dbConnected ? 'ok' : 'degraded',
      service: 'taskflow-api',
      database: dbConnected ? 'connected' : 'disconnected',
    });
  });

  app.get('/', (_req, res) => {
    res.json({
      message: 'TaskFlow API - Integración Continua',
      endpoints: {
        health: '/health',
        tasks: '/api/tasks',
      },
    });
  });

  app.use('/api/tasks', tasksRouter);

  return app;
}
