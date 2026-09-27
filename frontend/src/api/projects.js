import apiClient from './client';

// Fetches the list of public projects
export const getProjects = async () => {
  const response = await apiClient.get('/projects');
  return response.data;
};

// Fetches a single project by ID
export const getProject = async (id) => {
  const response = await apiClient.get(`/projects/${id}`);
  return response.data;
};