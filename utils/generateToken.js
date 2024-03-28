const jwt = require('jsonwebtoken');

const JWT_SECRET = 'C6s7d+ir51Dn0Ij/Bj3WG8EC0EGMh9ljBfwqfLzGJ0w=';

exports.generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '15d',
  });

  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //HS
    httpOnly: true, // prevent xss attacks cross-site scripting attack
    sameSite: 'strict', // CSRF attack cross-site forgery attack
    secure: process.env.NODE_ENV !== 'development',
  });
};
