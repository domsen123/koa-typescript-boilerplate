import { Context } from 'koa';
import { UserDetailsResponse } from '../../contracts/responses';
import { getUserDetailsService } from '../../services';

export const getUserDetailsHandler = async (ctx: Context) => {
  try {
    const user = await getUserDetailsService(ctx.userId);
    const body: UserDetailsResponse = {
      user,
    };
    ctx.status = 200;
    ctx.body = body;
  } catch (e) {
    throw e;
  }
};
