import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch data from the API
export const fetchData = createAsyncThunk('api/fetchData', async () => {
  const response = await axios.get('https://67055f04031fd46a830fb4fb.mockapi.io/redux');
  return response.data;
});

// Add a new post to the API
export const addPost = createAsyncThunk('api/addPost', async (newPost) => {
  const response = await axios.post('https://67055f04031fd46a830fb4fb.mockapi.io/redux', newPost);
  return response.data; // Return the created post
});

// Update an existing post in the API
export const updatePost = createAsyncThunk('api/updatePost', async ({ id, ...data }) => {
  const response = await axios.put(`https://67055f04031fd46a830fb4fb.mockapi.io/redux/${id}`, data);
  return response.data; // Return the updated post
});

// Delete a post from the API
export const deletePost = createAsyncThunk('api/deletePost', async (id) => {
  await axios.delete(`https://67055f04031fd46a830fb4fb.mockapi.io/redux/${id}`);
  return id; // Return the id of the deleted post
});

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.data.push(action.payload); // Add the new post to the state
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.data.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload; // Update the post in the state
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.data = state.data.filter((post) => post.id !== action.payload); // Remove the post from the state
      });
  },
});

// Export the actions for use in components
export default apiSlice.reducer; // Make sure to export the reducer
