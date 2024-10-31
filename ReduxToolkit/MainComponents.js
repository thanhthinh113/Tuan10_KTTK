import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, addPost, updatePost, deletePost } from './apiSlice';
import UserModal from './UserModal';

const MainComponent = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.api);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleOpenModal = () => {
    setEditData(null); // Clear edit data when adding a new post
    setModalVisible(true);
  };

  const handleEdit = (item) => {
    setEditData(item);
    setModalVisible(true);
  };

  const handleSubmit = (newData) => {
    if (editData) {
      dispatch(updatePost({ id: editData.id, ...newData }));
    } else {
      dispatch(addPost({ id: Date.now(), ...newData })); // ID can be handled by the API
    }
    setModalVisible(false);
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa mục này không?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Xóa",
          onPress: () => dispatch(deletePost(id)), // Nếu người dùng nhấn "Xóa"
          style: "destructive"
        }
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Add User" onPress={handleOpenModal} />
      
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.intro}>{item.title}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Edit" onPress={() => handleEdit(item)} />
              <Button title="Delete" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
      
      {/* User Modal */}
      <UserModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        editData={editData}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  intro: {
    fontSize: 14,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default MainComponent;
