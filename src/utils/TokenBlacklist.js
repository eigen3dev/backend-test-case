const blacklistedTokens = new Set();

/**
 * Add a token to the blacklist.
 *
 * @param {string} token - The token to be blacklisted.
 */
function blacklistToken(token) {
  // Add the token to the Set of blacklisted tokens.
  blacklistedTokens.add(token);
}

/**
 * Check if a token is blacklisted.
 *
 * @param {string} token - The token to check.
 * @returns {boolean} True if the token is blacklisted, false otherwise.
 */
function isBlackListed(token) {
  // Check if the token is present in the Set of blacklisted tokens.
  return blacklistedTokens.has(token);
}

// Export module
module.exports = {
  blacklistToken,
  isBlackListed,
};
