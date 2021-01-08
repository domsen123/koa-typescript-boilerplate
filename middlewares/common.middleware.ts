import Koa, { Next, Context } from 'koa';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import logger from 'koa-logger';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';

export const applyCommonMiddlewares = (app: Koa) => {
  app.use(helmet()).use(compress()).use(cors()).use(bodyParser());
  if (process.env.NODE_ENV !== 'production') {
    app.use(logger());
  }

  app.use(async (ctx: Context, next: Next) => {
    try {
      await next();
    } catch (error) {
      ctx.status = error.status || 500;
      ctx.body = {
        status: 'failed',
        message: error.message || 'Unknown Error',
        //stack: process.env.NODE_ENV !== 'production' ? error : undefined,
      };
    }
  });
};
