import { SET_TIMER, SET_SCORE } from "./types";
import Api from "../api/api";
import { URL_USER_LOGIN } from "../config";
import { Actions } from "react-native-router-flux";
import { AsyncStorage, Platform } from "react-native";
import { getUserData, updateLoggedInState } from "./ui";
import { createSocketChannel } from "./Socket";
import { createCustomerSocketChannel } from "./CustomerSocket";
import { Notifications } from "expo";

export const UPDATE_PASSWORD = "login/UPDATE_PASSWORD";
export const UPDATE_MOBILE_NUMBER = "login/UPDATE_MOBILE_NUMBER";
export const LOGIN_START = "login/LOGIN_START";
export const LOGIN_FAILED = "login/LOGIN_FAILED";
export const LOGIN_SUCCESSFUL = "login/LOGIN_SUCCESSFUL";
export const LOGIN_USER_ISSUE = "login/LOGIN_USER_ISSUE";
export const ON_SUBMEET_LOGIN_FORM = "login/ON_SUBMEET_LOGIN_FORM";
export const LOGIN_FAILED_IS_VENDOR_CHECK =
  "login/LOGIN_FAILED_IS_VENDOR_CHECK";

export const updateMobileNumber = val => (dispatch, getState) => {
  dispatch({
    type: UPDATE_MOBILE_NUMBER,
    payload: val
  });
};

export const updatePassword = val => (dispatch, getState) => {
  dispatch({
    type: UPDATE_PASSWORD,
    payload: val
  });
};

export const loginUser = () => async (dispatch, getState) => {
  dispatch({
    type: LOGIN_START
  });
  const { mobileno, password } = getState().login;

  let test = new FormData();
  let token =
    Platform.OS === "ios" ? null : await Notifications.getExpoPushTokenAsync();
  Notifications.createCategoryAsync("book", []);
  test.append("username", mobileno);
  test.append("password", password);
  test.append("device_token", token);
  test.append("device_type", Platform.OS);
  Api.post(URL_USER_LOGIN, test)
    .then(async response => {
      if (response.status === 1) {
        if (response.data.is_vendor == 1) {
          await AsyncStorage.setItem(
            "device_token",
            response.data.device_token
          );
          await AsyncStorage.setItem("token", response.token);
          await AsyncStorage.setItem("is_vendor", response.data.is_vendor);
          await AsyncStorage.setItem("user_id", response.data.id.toString());
          dispatch(getUserData());
          dispatch(updateLoggedInState(true));
            dispatch(createSocketChannel(response.data.id));
            Actions.FutureBooking();
          dispatch({
            type: LOGIN_SUCCESSFUL,
            payload: response
          });
        } else {
          dispatch({
            type: LOGIN_FAILED_IS_VENDOR_CHECK,
            payload:
              response.data.is_vendor == 1
                ? "You are not a registered Customer"
                : "You are not a registered Vendor"
          });
        }
      } else if (response.code === 0) {
        dispatch({
          type: LOGIN_USER_ISSUE,
          payload: response.message
        });
      } else {
        dispatch({
          type: LOGIN_FAILED
        });
      }
    })
    .catch(error => {});
};

export const updateOnSubmeetLoginForm = () => (dispatch, getState) => {
  dispatch({
    type: ON_SUBMEET_LOGIN_FORM
  });
};
