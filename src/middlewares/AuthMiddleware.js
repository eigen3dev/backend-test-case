const jwt = require("jsonwebtoken");
const tokenBlacklist = require("../utils/TokenBlacklist");

/**
 * Middleware to authenticate JSON Web Tokens.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} JSON response with an error message if authentication fails.
 */
const authenticateToken = (req, res, next) => {
  // Get the authorization header from the request.
  const authHeader = req.headers["authorization"];

  // Get the token from the header, if it exists.
  const token = authHeader && authHeader.split(" ")[1];

  // Check if token is provided.
  if (!token) {
    // Respond 401 error if no token is found.
    return res.status(401).json({ error: "No token provided" });
  }

  // Check if the token is in the blacklist.
  if (tokenBlacklist.isBlackListed(token)) {
    // Respond 401 error if the token is blacklisted.
    return res.status(401).json({ error: "Token has been invalidated" });
  }

  // Verify the token validity using the secret key.
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      // Respond 403 error if the token is not valid.
      return res.status(403).json({ error: "Token is not valid" });
    }

    // Attach the decoded user information to the request object.
    req.user = user;

    // Call the next middleware
    next();
  });
};

// Export module
module.exports = authenticateToken;
