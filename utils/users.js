const users = [];

function userJoin(id, username) {
  const user = { id, username };

  users.push(user);

  return user;
}

function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

function userLeave(id) {
  const index = users.findIndex((user) => user.id == id);
  console.log(index);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function getAllUsers() {
  const usernamesList = [];
  
  users.forEach((user) => {
    usernamesList.push(user.username);
  });

  console.log(usernamesList);

  return usernamesList;
}

function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getAllUsers,
  getRoomUsers,
};
