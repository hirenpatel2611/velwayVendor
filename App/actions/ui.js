import { SplashScreen, ImagePicker, AppLoading } from "expo";
import { AsyncStorage } from "react-native";
import Api from "../api/api";
import { GET_USER_DATA } from "../config";
import { Actions } from "react-native-router-flux";
import { loadVendorProfile, GetVenderStatus } from "./Vendors";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import * as Location from "expo-location";
export const LOAD_FONT_SUCCESS = "ui/LOAD_FONT_SUCCESS";
export const UPDATE_LOGGED_IN_STATE = "ui/UPDATE_LOGGED_IN_STATE";
export const UPDATE_IS_VENDOR = "user/UPDATE_IS_VENDOR";
export const SET_USER_INFO = "ui/SET_USER_INFO";
export const GET_USER_PROFILE_DATA_START = "ui/GET_USER_PROFILE_DATA_START";
export const GET_USER_PROFILE_DATA = "ui/GET_USER_PROFILE_DATA";
export const GET_USER_BOOKING_STATUS_ACCEPT =
  "ui/GET_USER_BOOKING_STATUS_ACCEPT";
export const SET_ALL_STATE_TO_INITIAL = "ui/SET_ALL_STATE_TO_INITIAL";
export const GET_USER_STATUS_PENDING = "ui/GET_USER_STATUS_PENDING";

export const loadFont = () => async dispatch => {
  // await Asset.loadAsync([
  //       require('../assets/images/tow-truck.png'),
  //     ]),
  await Font.loadAsync({
    "open-sans-italic": require("../../assets/fonts/OpenSans-Italic.ttf"),
    "open-sans-bold": require("../../assets/fonts/OpenSans-Bold.ttf"),
    "open-sans-regular": require("../../assets/fonts/OpenSans-Regular.ttf"),
    "circular-book": require("../../assets/fonts/CircularStd-Book.ttf"),
    "circular-bold": require("../../assets/fonts/CircularStd-Bold.ttf")
  });

  dispatch({
    type: LOAD_FONT_SUCCESS
  });
};

export const updateLoggedInState = bool => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_LOGGED_IN_STATE,
    payload: bool
  });
  const valueUserId = await AsyncStorage.getItem("user_id");
  const valueIsvendor = await AsyncStorage.getItem("is_vendor");

  dispatch({
    type: SET_USER_INFO,
    userId: valueUserId,
    isUserVendor: valueIsvendor
  });
};

export const updateIsVendor = bool => (dispatch, getState) => {
  dispatch({
    type: UPDATE_IS_VENDOR,
    payload: bool
  });
};

var i = 0;
export const getUserData = () => async (dispatch, getState) => {
  dispatch({
    type: GET_USER_PROFILE_DATA_START
  });

  const valueUserId = await AsyncStorage.getItem("user_id");
  const isVendorFlag = await AsyncStorage.getItem("is_vendor");
  let test = new FormData();
  test.append("id", valueUserId);
  Api.post(GET_USER_DATA, test).then(async response => {
    if (response.status === 0) {
      if (response.message === "Not found user detail.") {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("is_vendor");
        await AsyncStorage.removeItem("user_id");
        await AsyncStorage.removeItem("device_token");
        Actions.SplashFront();
      } else if (i < 10) {
        dispatch(getUserData());
        i++;
      }
    } else {
      if (response[0].status === "Pending") {
        dispatch({
          type: GET_USER_STATUS_PENDING
        });
      }
      dispatch({
        type: GET_USER_PROFILE_DATA,
        payload: response[0]
      });
      dispatch(GetVenderStatus());
      if (isVendorFlag === 1) {
        dispatch(loadVendorProfile());
      }
      const { userCurrentBooking } = getState().user;
      const { vendors, location } = getState().customers;

      if (location) {
        switch (response[0].current_booking.status) {
          case "pending":
            var vendorData;
            vendors.map(vendor => {
              if (vendor.id === response[0].current_booking.vendor_id) {
                vendorData = vendor;
              }
            });

            var loc = {
              latitude: parseFloat(vendorData.latitude),
              longitude: parseFloat(vendorData.longitude)
            };
            await Location.reverseGeocodeAsync(loc).then(res => {
              vendorData.address =
                res[0].name +
                "," +
                res[0].city +
                "," +
                res[0].region +
                "-" +
                res[0].postalCode;
            });
            var bookingStatusRes = { type: "PENDING" };
            var booking_id = {
              booking_id: response[0].current_booking.booking_id
            };
            dispatch({
              type: GET_USER_BOOKING_STATUS_ACCEPT,
              payload: { bookingStatusRes, vendorData, response }
            });
            break;

          case "accept":
            var vendorData;
            vendors.map(vendor => {
              if (vendor.id === response[0].current_booking.vendor_id) {
                vendorData = vendor;
              }
            });
            var loc = {
              latitude: parseFloat(vendorData.latitude),
              longitude: parseFloat(vendorData.longitude)
            };
            await Location.reverseGeocodeAsync(loc).then(res => {
              vendorData.address =
                res[0].name +
                "," +
                res[0].city +
                "," +
                res[0].region +
                "-" +
                res[0].postalCode;
            });

            var bookingStatusRes = { type: "ACCEPT" };
            var booking_id = {
              booking_id: response[0].current_booking.booking_id
            };
            dispatch({
              type: GET_USER_BOOKING_STATUS_ACCEPT,
              payload: { bookingStatusRes, vendorData, response }
            });

            break;

          case "on-the-way":
            var vendorData;
            vendors.map(vendor => {
              if (vendor.id === response[0].current_booking.vendor_id) {
                vendorData = vendor;
              }
            });

            var bookingStatusRes = { type: "ON-THE-WAY" };
            var booking_id = {
              booking_id: response[0].current_booking.booking_id
            };
            dispatch({
              type: GET_USER_BOOKING_STATUS_ACCEPT,
              payload: { bookingStatusRes, vendorData, response }
            });
            Actions.NavigationMap();
            break;

          case "reached":
            var vendorData;
            vendors.map(vendor => {
              if (vendor.id === response[0].current_booking.vendor_id) {
                vendorData = vendor;
              }
            });

            var bookingStatusRes = { type: "REACHED" };
            booking_id = { booking_id: response[0].current_booking.booking_id };
            dispatch({
              type: GET_USER_BOOKING_STATUS_ACCEPT,
              payload: { bookingStatusRes, vendorData, response }
            });
            Actions.NavigationMap();
            break;

          default:
        }
        SplashScreen.hide();
      }
    }
  });
};

export const setAllStateToInitial = () => dispatch => {
  dispatch({
    type: SET_ALL_STATE_TO_INITIAL
  });
};
