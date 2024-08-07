const AuthService = require("../../services/Auth/AuthService");
const LoginResponse = require("../../resources/LoginResponse");

/**
 * Handles the login request.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request, containing login credentials.
 * @param {Object} res - The response object.
 * @returns {Object} JSON response with user data and token, or an error message.
 */
exports.login = async (req, res) => {
  try {
    // Try to log in using the provided credentials.
    const { user, token } = await AuthService.loginService(req.body);

    // Return success response with user data and token.
    return res.status(200).json(LoginResponse(user, token));
  } catch (error) {
    // Check if the error is due to invalid credentials.
    if (error.message === "Invalid email or password") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Return server error response.
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Handles the logout request.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} JSON response with a success message or an error message.
 */
exports.logout = async (req, res) => {
  try {
    // Call the logout service.
    await AuthService.logoutService(req);

    // Return success response.
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    // Return server error response.
    return res.status(500).json({ error: error.message });
  }
};
