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
//   console.log(`Token added for user ${userId}: ${token}`,tokenStore);
};

// Function to remove a token for a user
exports.removeToken = (userId, token) => {
//   console.log(tokenStore, "Before removing token");

  const userTokens = tokenStore[userId];
  const tokenIndex = userTokens.indexOf(token);
  if (!userTokens) {
    return false; // User not found, token not removed
  }
  let result = userTokens.pop();
  console.log(`Token removed for user ${userId}: ${result}`);
  console.log(tokenStore[userId].length, "After removing token",result,tokenIndex);
  return result;


//   if (tokenIndex !== -1) {
//     // Remove the token from the user's tokens
//     userTokens.splice(tokenIndex, 1);

//     // If no tokens are left for the user, remove the user entry
//     if (userTokens.length === 0) {
//       delete tokenStore[userId];
//     }

//     return true; // Token removed
//   } else {
//     console.log(`Token not found for user ${userId}: ${token}`);
//     return false; // Token not found for the user
//   }
};

// Function to get all tokens for a user
exports.getUserTokens = (userId) => {
  return tokenStore[userId] || [];
};
