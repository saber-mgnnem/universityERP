import API from "./api";

// GET
export const getSessions = async () => {
  const res = await API.get("/academic-sessions");
  return res.data;
};

// CREATE
export const createSession = async (data) => {
  const res = await API.post("/academic-sessions", data);
  return res.data;
};

// DELETE
export const deleteSession = async (id) => {
  const res = await API.delete(`/academic-sessions/${id}`);
  return res.data;
};