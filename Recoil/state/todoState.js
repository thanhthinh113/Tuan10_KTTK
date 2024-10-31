// src/state/todoState.js
import { atom } from 'recoil';

// Tạo atom cho danh sách todo
export const todoListState = atom({
  key: 'todoListState',
  default: [],
});
