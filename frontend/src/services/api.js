import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});


// -----------------------------
// AUTH APIs
// -----------------------------
export const signupUser = (data) =>
  API.post('signup/', data);

export const loginUser = (data) =>
  API.post('login/', data);


// -----------------------------
// PROJECT APIs
// -----------------------------
export const getProjects = () =>
  API.get('projects/');

export const createProject = (data) =>
  API.post('projects/', data);


export default API;