let tokenStore = {};

// Function to check if a token exists for a user
exports.checkToken = (userId, token) => {
  const userTokens = tokenStore[userId] || [];
  return userTokens.includes(token);
};

// Function to add a token for a user
exports.addToken = (userId, token) => {
  if (!tokenStore[userId]) {
    tokenStore[userId] = [];
  }
  tokenStore[userId].push(token);
};

// Function to remove a token for a user
exports.removeToken = (userId, token) => {
  if (!tokenStore[userId]) {
    return false; // User not found, token not removed
  }
  
  const userTokens = tokenStore[userId];
  const tokenIndex = userTokens.indexOf(token);

  if (tokenIndex !== -1) {
    // Remove the token from the user's tokens
    userTokens.splice(tokenIndex, 1);

    // If no tokens are left for the user, remove the user entry
    if (userTokens.length === 0) {
      delete tokenStore[userId];
    }

    return true; // Token removed
  } else {
    return false; // Token not found for the user
  }
};
