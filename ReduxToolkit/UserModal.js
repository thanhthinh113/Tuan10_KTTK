import React, { useEffect, useState } from 'react';
import { View, Text, Button, Modal, TextInput, StyleSheet } from 'react-native';

const UserModal = ({ visible, onClose, onSubmit, editData }) => {
  const [name, setName] = useState(''); // Change title to name
  const [intro, setIntro] = useState('');

  useEffect(() => {
    if (editData) {
      setName(editData.name); // Set name from editData
      setIntro(editData.title); // Set intro from editData
    } else {
      setName(''); // Clear name when no editData
      setIntro(''); // Clear intro when no editData
    }
  }, [editData]);

  const handleSubmit = () => {
    onSubmit({ name, intro }); // Submit name instead of title
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{editData ? 'Edit User' : 'Add User'}</Text>
          <TextInput
            placeholder="Enter name"
            value={name} // Use name state here
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter introduction"
            value={intro}
            onChangeText={setIntro}
            style={styles.input}
          />
          <Button title={editData ? "Update" : "Add"} onPress={handleSubmit} />
          <Button title="Cancel" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderColor: '#ccc',
  },
});

export default UserModal;
