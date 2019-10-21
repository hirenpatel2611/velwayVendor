import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import RegisterReducer from './RegisterReducer';
import UIReducer from './UIReducer';
import CustomerReducers from './CustomerReducers';
import VendorsReducers from './VendorsReducers';
import UserReducer from './UserReducer';
import ForgotReducer from './ForgotReducer'

export default combineReducers({
  login:LoginReducer,
  register:RegisterReducer,
  ui:UIReducer,
  customers:CustomerReducers,
  vendors:VendorsReducers,
  user:UserReducer,
  forgot:ForgotReducer,
});
