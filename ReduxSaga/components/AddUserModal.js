// src/components/AddUserModal.js
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

const AddUserModal = ({ visible, onClose, user }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');

  // Populate fields if editing an existing user
  useEffect(() => {
    if (user) {
      setName(user.name);
      setTitle(user.title);
    } else {
      setName('');
      setTitle('');
    }
  }, [user]);

  const handleSave = () => {
    if (user) {
      // If editing, dispatch EDIT_ITEM_REQUEST
      dispatch({ type: 'EDIT_ITEM_REQUEST', payload: { ...user, name, title } });
    } else {
      // If adding, dispatch ADD_ITEM_REQUEST
      dispatch({ type: 'ADD_ITEM_REQUEST', payload: { name, title } });
    }
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Change title based on whether adding or editing */}
          <Text style={styles.modalTitle}>{user ? 'Edit User' : 'Add User'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>{user ? 'Save Changes' : 'Add User'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddUserModal;
