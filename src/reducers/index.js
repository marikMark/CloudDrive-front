import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import driveReducer from './driveReducer';
import fileReducer from './fileReducer';
import loadingReducer from './loadingReducer';
import uploadReducer from './uploadReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    user: userReducer,
    drive: driveReducer,
    loading: loadingReducer,
    files: fileReducer,
    upload: uploadReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));