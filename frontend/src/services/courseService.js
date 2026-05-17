import API from "./api";

// GET
export const getCourses = async () => {
  const res = await API.get("/courses");
  return res.data;
};

// CREATE
export const createCourse = async (data) => {
  const res = await API.post("/courses", data);
  return res.data;
};
export const updateCourse = async (id, data) => {
  const res = await API.put(`/courses/${id}`, data);
  return res.data;
};

// DELETE
export const deleteCourse = async (id) => {
  return API.delete(`/courses/${id}`);
};