import clerk from '../utils/clerk.js';

export const getUser = async (id) => {
  const user = await clerk.users.getUser(id);
  return user;
};

export const getAllUsers = async () => {
  const users = await clerk.users.getUserList();
  return users;
};

export const getUsers = async (ids) => {
  let users = [];
  for (var i = 0; i < ids.length; i++) {
    const user = await clerk.users.getUser(ids[i]);
    users = [...users, user];
  }

  return users;
};

export const updateUser = async (id, props) => {
  return await clerk.users.updateUser(id, props);
};

export const updateUserImage = async (id, image) => {
  return await clerk.users.updateUserProfileImage(id, image);
};

export const getUsersQuery = async (q) => {
  const users = await clerk.users.getUserList();

  return users.filter(
    (m) =>
      m.firstName.toLowerCase().includes(q.toLowerCase()) ||
      m.lastName.toLowerCase().includes(q.toLowerCase())
  );
};
