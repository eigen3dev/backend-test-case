/**
 * Login response.
 */
function LoginResponse(user, token) {
  return {
    message: "Login successful",
    user: {
      id: user.id,
      email: user.email,
    },
    token: token,
  };
}

module.exports = LoginResponse;
