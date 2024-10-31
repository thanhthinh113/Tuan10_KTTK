// src/components/UpdateTodoModal.js
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const UpdateTodoModal = ({ visible, onClose, onUpdate, todo }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (todo) {
      setName(todo.name);
      setTitle(todo.title);
    }
  }, [todo]);

  const handleUpdate = () => {
    const updatedTodo = { id: todo.id, name, title };
    onUpdate(updatedTodo);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Cập nhật Todo</Text>
          <TextInput
            style={styles.input}
            placeholder="Tên"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Tiêu đề"
            value={title}
            onChangeText={setTitle}
          />
          <Button title="Cập nhật" onPress={handleUpdate} />
          <Button title="Đóng" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default UpdateTodoModal;
