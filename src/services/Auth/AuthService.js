const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRepository = require("../../repositories/User/UserRepository");
const tokenBlacklist = require("../../utils/TokenBlacklist");

class AuthService {
  /**
   * Handles the login operation.
   *
   * @param {Object} credentials - The user's login credentials.
   * @param {string} credentials.email - The user's email address.
   * @param {string} credentials.password - The user's password.
   * @returns {Promise<Object>} An object containing the user information and a token.
   * @throws {Error} Throws an error if the email or password is invalid.
   */
  async loginService({ email, password }) {
    // Find the user by email.
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      // Throw an error if the user is not found.
      throw new Error("Invalid email or password");
    }

    // Compare the provided password with the stored hashed password.
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      // Throw an error if the password is incorrect.
      throw new Error("Invalid email or password");
    }

    // Generate a JWT for the user.
    const token = jwt.sign(
      // Payload with user ID and email.
      { id: user.id, email: user.email },
      // Secret key for signing the token.
      process.env.ACCESS_TOKEN_SECRET,
      // Token expiration time.
      { expiresIn: "1h" },
    );

    // Return the user information and the token.
    return { user, token };
  }

  /**
   * Handles the logout operation.
   *
   * @param {Object} req - The HTTP request object containing the authorization header.
   * @returns {Promise<boolean>} Resolves to true if logout is successful.
   * @throws {Error} Throws an error if no token is provided.
   */
  async logoutService(req) {
    // Get the authorization header from the request.
    const authHeader = req.headers["authorization"];

    // Get the token from the header, if it exists.
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      // Throw an error if no token is found.
      throw new Error("No token provided");
    }

    // Add the token to the blacklist to invalidate it.
    tokenBlacklist.blacklistToken(token);

    // Return true indicating successful logout.
    return true;
  }
}

// Export Module
module.exports = new AuthService();
