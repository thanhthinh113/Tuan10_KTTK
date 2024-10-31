// src/screens/TodoApp.js
import React, { useState } from 'react';
import { SafeAreaView, FlatList, Button } from 'react-native';
import TodoItem from '../components/TodoItem';
import UpdateTodoModal from '../components/UpdateTodoModal';
import AddTodoModal from '../components/AddTodoModal';
import useTodos from '../hooks/useTodos';

const TodoApp = () => {
  const { todoList, handleDelete, handleUpdate, handleAdd } = useTodos();
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const openUpdateModal = (todo) => {
    setSelectedTodo(todo);
    setUpdateModalVisible(true);
  };

  const openAddModal = () => {
    setAddModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Button title="Thêm Todo" onPress={openAddModal} />
      <FlatList
        data={todoList}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onDelete={handleDelete}
            onUpdate={openUpdateModal} // Mở modal khi cập nhật
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <UpdateTodoModal
        visible={updateModalVisible}
        onClose={() => {
          setUpdateModalVisible(false);
          setSelectedTodo(null); // Reset selectedTodo khi đóng modal
        }}
        onUpdate={handleUpdate}
        todo={selectedTodo} // Truyền todo đang được cập nhật
      />

      <AddTodoModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onAdd={handleAdd}
      />
    </SafeAreaView>
  );
};

export default TodoApp;
