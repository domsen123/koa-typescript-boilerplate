import { Context } from 'koa';
import { DTOSignIn, DTOSignUp } from '../../contracts/dto/auth.dto';
import { SignInRequest, SignUpRequest } from '../../contracts/requests';
import { SignInResponse, SignUpResponse } from '../../contracts/responses';
import { signInService, signUpService } from '../../services';

export const signInHandler = async (ctx: Context) => {
  try {
    const request = ctx.request.body as SignInRequest;
    const dto: DTOSignIn = {
      email: request.email,
      password: request.password,
    };
    const { user, token } = await signInService(dto);
    const body: SignInResponse = {
      user,
      token,
    };
    ctx.status = 200;
    ctx.body = body;
  } catch (e) {
    throw e;
  }
};

export const signUpHandler = async (ctx: Context) => {
  try {
    const request = ctx.request.body as SignUpRequest;
    const dto: DTOSignUp = {
      name: request.name,
      email: request.email,
      password: request.password,
    };
    const { user, token } = await signUpService(dto);
    const body: SignUpResponse = {
      user,
      token,
    };
    ctx.status = 200;
    ctx.body = body;
  } catch (e) {
    throw e;
  }
};
