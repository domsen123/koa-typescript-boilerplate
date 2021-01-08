import Koa from 'koa';
import { getDatabase } from './db';
import { getWorkerQueue } from './queues';
import { authenticationMiddleware } from './middlewares/auth.middleware';
import { applyCommonMiddlewares } from './middlewares/common.middleware';
import { setupAnonymousRoutes, setupAuthenticatedRoutes } from './routes';

export const createServer = async (): Promise<Koa> => {
  const app = new Koa();
  applyCommonMiddlewares(app);
  await getDatabase();
  await getWorkerQueue();

  setupAnonymousRoutes(app);
  app.use(authenticationMiddleware);
  setupAuthenticatedRoutes(app);

  return app;
};
