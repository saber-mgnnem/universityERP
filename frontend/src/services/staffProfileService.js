import API from './api';

export const getStaffProfiles = async () => {
  const res = await API.get('/staff-profiles');
  return res.data;
};