import jwt from 'jsonwebtoken';
import User from './../models/user_models.js';

const JWT_SECRET = 'e3JKWImdoKj5YI0OTgp2ZJ65p+zCe4zqw0gPY7n9Q80=';

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ err: 'Unauthorized - No Token Provided' });
    }
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return res.status(403).json({ err: 'Invalid or Expired Token' });
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ err: 'No such user found.' });
    }
    req.user = user;

    next();
  } catch (err) {
    console.log('Error in protectRoute controller:', err.message);
    res.status(500).json({ err: 'internal server error' });
  }
};

export default protectRoute;
