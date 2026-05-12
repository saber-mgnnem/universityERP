import API from './api';

// GET ALL
export const getContracts = async () => {
  const res = await API.get('/employment-contracts');
  return res.data;
};

// CREATE
export const createContract = async (data) => {
  const res = await API.post('/employment-contracts', data);
  return res.data;
};

// UPDATE
export const updateContract = async (id, data) => {
  const res = await API.put(`/employment-contracts/${id}`, data);
  return res.data;
};

// DELETE
export const deleteContract = async (id) => {
  const res = await API.delete(`/employment-contracts/${id}`);
  return res.data;
};