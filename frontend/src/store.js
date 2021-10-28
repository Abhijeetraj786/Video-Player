import thunk from 'redux-thunk';
import {compose,createStore,applyMiddleware, combineReducers} from 'redux';
import {
  userRegisterReducer,
  userSigninReducer
} from './reducers/userReducers';
const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
    },
  };
const reducer= combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store =createStore(reducer,initialState ,composeEnhancer(applyMiddleware(thunk)));

export default store;