import jwt from 'jsonwebtoken';
import errorHandler from './error.middlewares.js';
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next('Unauthorized');
  }
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return next(errorHandler('Unauthorized'));
    }
    req.user = user;
    next();
  });
};