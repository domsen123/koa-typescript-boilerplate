import { Middleware } from 'koa';
import { Router } from 'koa-joi-router';
export interface RouteHandler {
  authenticated(router: Router): Middleware | undefined;
  anonymous(router: Router): Middleware | undefined;
}
