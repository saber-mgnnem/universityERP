import API from "./api";

export const getDepartments = async () => {
  const res = await API.get("/departments");
  return res.data;
};

export const createDepartment = async (data) => {
  const res = await API.post("/departments", data);
  return res.data;
};

export const updateDepartment = async (id, data) => {
  const res = await API.put(`/departments/${id}`, data);
  return res.data;
};

export const deleteDepartment = async (id) => {
  const res = await API.delete(`/departments/${id}`);
  return res.data;
};

// GET ALL
export const getBudgets = async () => {
  const res = await API.get("/department-budgets");
  return res.data;
};

// CREATE
export const createBudget = async (data) => {
  const res = await API.post("/department-budgets", data);
  return res.data;
};