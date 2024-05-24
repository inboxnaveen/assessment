import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage';

import UserReducer from './User/UserReducer';

const reducers = combineReducers({
  userData: UserReducer,
});

const persistConfig = {
  key: 'root',
  storage: FilesystemStorage,
};

const appReducer = persistReducer(persistConfig, reducers);

export default appReducer;
