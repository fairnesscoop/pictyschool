import { get } from '../utils/axios';

export default async (req, res, next) => {
  // Catch only sapper routing
  if (req.url.startsWith('/service-worker')) {
    return next();
  }

  const token = req.cookies?.photoschool_token;

  if (!token) {
    return next();
  }

  try {
    const {
      data: { id, firstName, lastName, email },
    } = await get('users/me', {}, decodeURIComponent(token));
    req.user = {
      id,
      firstName,
      lastName,
      email,
      scope: 'photographer'
    };

    return next();
  } catch (e) {
    return next();
  }
};
