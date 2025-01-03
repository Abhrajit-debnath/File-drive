import express from 'express';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.get('/check', (req, res) => {
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ isAuthenticated: false });
  }

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return res.json({ isAuthenticated: true, user: decoded });
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(401).json({ isAuthenticated: false, message: 'Invalid or expired token' });
  }
});

export default router;
