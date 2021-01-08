import { Context, Next } from 'koa';
import { decodeClientToken } from '../utils/jwt';
import { clog } from '../utils/logger';

export const authenticationMiddleware = async (ctx: Context, next: Next) => {
  const token = ctx.get('X-API-KEY');
  if (!token) throw { status: 401, message: 'Access Denied' };
  const user = decodeClientToken(token);
  if (!(user && user.id))
    throw { status: 401, message: 'Can not decode token' };

  ctx.userId = user.id;

  await next();
};
