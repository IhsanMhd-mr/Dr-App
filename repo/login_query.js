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
  console.log(`Token added for user ${userId}: ${token}`,tokenStore);
};

// Function to remove a token for a user
exports.removeToken = (userId, token) => {
  console.log(tokenStore, "Before removing token");

  const userTokens = tokenStore[userId];
  const tokenIndex = userTokens.indexOf(token);
  let x = userTokens.pop();
    console.log(`Token removed for user ${userId}: ${token}`);
    console.log(tokenStore.length, "After removing token",x);
  if (!tokenStore[userId]) {
    return false; // User not found, token not removed
  }


  if (tokenIndex !== -1) {
    // Remove the token from the user's tokens
    userTokens.splice(tokenIndex, 1);

    // If no tokens are left for the user, remove the user entry
    if (userTokens.length === 0) {
      delete tokenStore[userId];
    }

    return true; // Token removed
  } else {
    console.log(`Token not found for user ${userId}: ${token}`);
    return false; // Token not found for the user
  }
};

// Function to get all tokens for a user
exports.getUserTokens = (userId) => {
  return tokenStore[userId] || [];
};
