import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    console.error('No token provided');
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded user:', decoded); 
    req.user = decoded; 
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

export default authMiddleware;
