const jwt = require('jsonwebtoken');
// Middleware to authenticate requests using token
function authenticateToken(req, res, next) {
    // Extract token from request headers
    // const token = req.headers['authorization']?.split(' ')[1]; // Assuming 'Bearer <token>'
    const token = req.cookies.token;
  
    // Check if the token is not empty
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    // Verify the token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
      }
      
      // Token is valid, attach user to request and proceed
      req.user = user;
      console.log(req.user)
      next();
    });
  }
  module.exports = authenticateToken;