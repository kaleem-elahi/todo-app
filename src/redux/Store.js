import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import allData from './reducers';

const rootReducer = combineReducers({
  data: allData,
  form: formReducer,
});

export default rootReducer;
