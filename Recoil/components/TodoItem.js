// src/components/TodoItem.js
import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

const TodoItem = ({ item, onDelete, onUpdate }) => {
  const confirmDelete = () => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa todo này không?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Xóa",
          onPress: () => onDelete(item.id), // Nếu người dùng nhấn "Xóa"
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Button title="Xóa" onPress={confirmDelete} color="red" />
      <Button title="Cập nhật" onPress={() => onUpdate(item)} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    color: '#333',
  },
});

export default TodoItem;
