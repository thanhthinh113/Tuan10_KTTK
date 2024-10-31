// src/hooks/useTodos.js
import { useEffect, useState } from 'react';
import { fetchTodos, addTodo, deleteTodo, updateTodo } from '../api/todoApi';

const useTodos = () => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const todos = await fetchTodos();
      setTodoList(todos);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodoList(todoList.filter(todo => todo.id !== id));
  };

  const handleUpdate = async (updatedTodo) => {
    const todo = await updateTodo(updatedTodo.id, updatedTodo);
    setTodoList(todoList.map(todo => (todo.id === updatedTodo.id ? todo : todo))); // Cập nhật danh sách todo
  };

  const handleAdd = async (newTodo) => {
    const todo = await addTodo(newTodo);
    setTodoList([...todoList, todo]);
  };

  return { todoList, handleDelete, handleUpdate, handleAdd };
};

export default useTodos;
