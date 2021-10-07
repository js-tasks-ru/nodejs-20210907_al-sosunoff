import { router } from '../app';

export const handleMongooseValidationError: Parameters<typeof router.post>['2'] =
  async (ctx, next) => {
    try {
      await next();
    } catch (err: any) {
      if (err.name !== 'ValidationError') throw err;

      ctx.status = 400;

      const errors: {
        [key: string]: string
      } = {};

      for (const field of Object.keys(err.errors)) {
        errors[field] = err.errors[field].message;
      }

      ctx.body = {
        errors: errors,
      };
    }
  };
