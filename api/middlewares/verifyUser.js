import jwt from 'jsonwebtoken';
import errorHandler from './error.middlewares.js';
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
   return res.status(401).json({ success: false, message: "No token provided. Please login first." });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded; // attach user to request
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token. Please login again." });
  }
};