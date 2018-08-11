import _ from 'lodash';

const  DatacoursesReducer = ( state = {
  data:[],
  error: null
}, action ) => {
  switch (action.type) {
    case 'START_FETCH_DATA':
      state = {
        ...state
      }
      return state;
    case 'FETCH_SUCCESS_DATA':
      const defaultData = action.payload;
      state = {
        ...state,
        defaultData,
        data: action.payload
      }
      return state;
    case 'FETCH_ERROR_DATA':
      state = {
        ...state,
        data: null,
        error: action.error
      }
      return state;
    case 'NEW_ITEM_DATA':
      var newAdd = [
        {
          "id": action.payload.id,
          "title": action.payload.title,
          "authorId": action.payload.authorId,
          "length": action.payload.length,
          "category": action.payload.category,
        }
      ]
      state = {
        ...state,
        data: newAdd.concat(state.data)
      }
      return state;
    case 'DELETE_ITEM_DATA':
      for (var i = 0; i < action.payload.length; i++) {
      var index = _.findIndex(state.data, function (o) {
          return o.id === action.payload[i]
        });
        state.data.splice(index, 1);
      }
      state = {
        ...state,
        data: state.data
      }
      return state;

    case 'EDIT_ITEM_DATA':
      var index = _.findIndex(state.data, function (o) { return o.id === action.payload.id; });
      state.data[index] = action.payload;
      return state;

    default: return state;
  }
}
 export default DatacoursesReducer;
