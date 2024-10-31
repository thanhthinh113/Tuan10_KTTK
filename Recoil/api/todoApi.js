// src/api/todoApi.js
import axios from 'axios';

const API_URL = 'https://67055f04031fd46a830fb4fb.mockapi.io/redux';

export const fetchTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTodo = async (newTodo) => {
  const response = await axios.post(API_URL, newTodo); // Gọi API để thêm todo
  return response.data; // Giả sử response.data là todo mới thêm
};

export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateTodo = async (id, updatedTodo) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
  return response.data;
};
