import { router } from '../app';

export const mustBeAuthenticated: Parameters<typeof router.get>['2'] = (
  ctx,
  next
) => {
  return next();
};
