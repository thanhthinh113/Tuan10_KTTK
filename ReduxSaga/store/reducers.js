// src/reducer.js
const initialState = {
  data: [],
  loading: false,
  error: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_DATA_REQUEST':
    case 'ADD_ITEM_REQUEST':
    case 'EDIT_ITEM_REQUEST':
    case 'DELETE_ITEM_REQUEST':
      return { ...state, loading: true, error: null };
      
    case 'FETCH_DATA_SUCCESS':
      return { ...state, loading: false, data: action.payload };

    case 'ADD_ITEM_SUCCESS':
    case 'EDIT_ITEM_SUCCESS':
    case 'DELETE_ITEM_SUCCESS':
      return { ...state, loading: false };

    case 'FETCH_DATA_FAILURE':
    case 'ADD_ITEM_FAILURE':
    case 'EDIT_ITEM_FAILURE':
    case 'DELETE_ITEM_FAILURE':
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
}

export default rootReducer;
