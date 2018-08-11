import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import DatacoursesReducer from './DatacoursesReducer';
import EditReducer from './EditReducer';

export default combineReducers({
  form: formReducer,
  DatacoursesReducer,
  EditReducer
});
