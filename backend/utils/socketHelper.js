// Assuming this is inside your utils folder

// The userSocketMap holds the mapping of userId to socketId
const userSocketMap = {}; // { userId: socketId }

function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// You can also export a function to set up the socket mapping
function setUserSocketMapping(userId, socketId) {
  userSocketMap[userId] = socketId;
}

module.exports = { getReceiverSocketId, setUserSocketMapping };
