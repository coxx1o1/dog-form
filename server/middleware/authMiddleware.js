import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user (or admin) role to the request. In your current setup, the token
      // payload from authRoutes.js is { role: "admin" }. If you switch to using
      // authController.js, the payload might contain 'id'. For now, let's just
      // add what's available.
      req.user = decoded; // This will contain { role: "admin" }

      next(); // Call next middleware/route handler
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { protect };