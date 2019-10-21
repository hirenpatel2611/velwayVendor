import {
  UPDATE_PASSWORD,
  UPDATE_MOBILE_NUMBER,
  LOGIN_START,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  LOGIN_USER_ISSUE,
  ON_SUBMEET_LOGIN_FORM,
  LOGIN_FAILED_IS_VENDOR_CHECK
} from "../actions/Login";
import { SET_ALL_STATE_TO_INITIAL } from "../actions/ui";

const INITIAL_STATE = {
  password: "",
  mobileno: "",
  loading: false,
  loginFailed: false,
  loginStatus: 0,
  LoginUserIssue: "",
  onSubmeetLoginForm: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD:
      {
        return {
          ...state,
          password: action.payload,
          onSubmeetLoginForm: false,
          loginFailed: false,
          LoginUserIssue: ""
        };
      }
      break;

    case UPDATE_MOBILE_NUMBER:
      {
        return {
          ...state,
          mobileno: action.payload,
          onSubmeetLoginForm: false,
          loginFailed: false,
          LoginUserIssue: ""
        };
      }
      break;

    case LOGIN_START:
      {
        return { ...state, loading: !state.loading, LoginUserIssue: "" };
      }
      break;

    case LOGIN_SUCCESSFUL:
      {
        return {
          ...state,
          loading: false,
          loginStatus: action.payload,
          loginFailed: false
        };
      }
      break;

    case LOGIN_FAILED:
      {
        return { ...state, loading: false, loginFailed: true };
      }
      break;

    case LOGIN_USER_ISSUE:
      {
        return { ...state, LoginUserIssue: action.payload, loading: false };
      }
      break;

    case LOGIN_FAILED_IS_VENDOR_CHECK:
      {
        return {
          ...state,
          LoginUserIssue: action.payload,
          loading: false,
          loginFailed: false
        };
      }
      break;

    case ON_SUBMEET_LOGIN_FORM:
      {
        return { ...state, onSubmeetLoginForm: true };
      }
      break;

    case SET_ALL_STATE_TO_INITIAL:
      {
        return {
          ...state,
          ...INITIAL_STATE
        };
      }
      break;

    default:
      return state;
      break;
  }
};
