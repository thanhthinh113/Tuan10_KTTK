// src/sagas.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// API URLs
const API_URL = 'https://67055f04031fd46a830fb4fb.mockapi.io/redux';

// Fetch all users
function* fetchUsers() {
  try {
    const response = yield call(axios.get, API_URL);
    yield put({ type: 'FETCH_DATA_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ type: 'FETCH_DATA_FAILURE', error: error.message });
  }
}

// Add user
function* addUser(action) {
  try {
    const response = yield call(axios.post, API_URL, action.payload);
    yield put({ type: 'ADD_ITEM_SUCCESS', payload: response.data });
    yield put({ type: 'FETCH_DATA_REQUEST' }); // Refresh data after adding
  } catch (error) {
    yield put({ type: 'ADD_ITEM_FAILURE', error: error.message });
  }
}

// Edit user
function* editUser(action) {
  try {
    const response = yield call(axios.put, `${API_URL}/${action.payload.id}`, action.payload);
    yield put({ type: 'EDIT_ITEM_SUCCESS', payload: response.data });
    yield put({ type: 'FETCH_DATA_REQUEST' }); // Refresh data after editing
  } catch (error) {
    yield put({ type: 'EDIT_ITEM_FAILURE', error: error.message });
  }
}

// Delete user
function* deleteUser(action) {
  try {
    yield call(axios.delete, `${API_URL}/${action.payload}`);
    yield put({ type: 'DELETE_ITEM_SUCCESS', payload: action.payload });
    yield put({ type: 'FETCH_DATA_REQUEST' }); // Refresh data after deletion
  } catch (error) {
    yield put({ type: 'DELETE_ITEM_FAILURE', error: error.message });
  }
}

export default function* rootSaga() {
  yield takeLatest('FETCH_DATA_REQUEST', fetchUsers);
  yield takeLatest('ADD_ITEM_REQUEST', addUser);
  yield takeLatest('EDIT_ITEM_REQUEST', editUser);
  yield takeLatest('DELETE_ITEM_REQUEST', deleteUser);
}
