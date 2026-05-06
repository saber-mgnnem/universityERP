import API from "./api";

// GET ALL USERS
export const getUsers = async () => {
  const res = await API.get("/users");
  return res.data;
};

// CREATE USER
export const createUser = async (data) => {
  const res = await API.post("/users", data);
  return res.data;
};

// UPDATE USER
export const updateUser = async (id, data) => {
  const res = await API.put(`/users/${id}`, data);
  return res.data;
};

// DELETE USER
export const deleteUser = async (id) => {
  const res = await API.delete(`/users/${id}`);
  return res.data;
};