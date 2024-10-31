// store.js
import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './apiSlice'; // Adjust the import based on your file structure

const store = configureStore({
  reducer: {
    api: apiSlice, // Ensure your slice is correctly added here
  },
});

export default store;
