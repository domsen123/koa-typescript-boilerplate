import Koa from 'koa';
import router from 'koa-joi-router';
import { clog } from '../utils/logger';
import AuthRoutes from './auth/auth.routes';

const API_PREFIX = process.env.API_PREFIX || '/_api/v1';
const routes = [AuthRoutes];

export const setupAnonymousRoutes = (app: Koa) => {
  routes.forEach((handler) => {
    const __ = router();
    __.prefix(API_PREFIX);
    const mw = handler.anonymous(__);
    if (mw) {
      app.use(mw);
    }
  });
};

export const setupAuthenticatedRoutes = (app: Koa) => {
  routes.forEach((handler) => {
    const __ = router();
    __.prefix(API_PREFIX);
    const mw = handler.authenticated(__);
    if (mw) {
      app.use(mw);
    }
  });
};
