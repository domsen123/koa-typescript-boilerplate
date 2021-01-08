import { Router, Joi } from 'koa-joi-router';
import { RouteHandler } from '../../contracts/routes/route-handler.contract';
import { signInHandler, signUpHandler } from './auth.anonymous';
import { getUserDetailsHandler } from './auth.authenticated';

class AuthRoutes implements RouteHandler {
  public authenticated(router: Router) {
    router.route([
      {
        method: 'POST',
        path: '/me',
        handler: getUserDetailsHandler,
      },
    ]);
    return router.middleware();
  }

  public anonymous(router: Router) {
    router.route([
      {
        method: 'POST',
        path: '/signin',
        validate: {
          type: 'json',
          body: {
            email: Joi.string().required().email(),
            password: Joi.string().required(),
          },
        },
        handler: signInHandler,
      },
      {
        method: 'POST',
        path: '/signup',
        validate: {
          type: 'json',
          body: {
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required(),
          },
        },
        handler: signUpHandler,
      },
    ]);
    return router.middleware();
  }
}

export default new AuthRoutes();
