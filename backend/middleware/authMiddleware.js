// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.header('Authorization');

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   const token = authHeader.split(' ')[1]; // Extract token part only

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach decoded payload to req.user
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

// module.exports = authMiddleware;
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;