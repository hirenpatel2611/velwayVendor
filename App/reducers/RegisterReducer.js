import {
  UPDATE_VEHICLE_BOOL,
  UPDATE_CAR_BOOL,
  UPDATE_HEAVY_VEHICLE_BOOL,
  UPDATE_TOWING_SERVICE_BOOL,
  UPDATE_TYRE_SERVICE_BOOL,
  UPDATE_USER_TYPE,
  UPDATE_MOBILE_NO,
  UPDATE_OTP_TIMEOUT,
  SET_TIME_OUT,
  ON_OTP_CHANGE,
  TOGGLE_MODAL_PROFILE,
  TOGGLE_MODAL_OTP,
  UPDATE_NAME,
  UPDATE_ADDRESS,
  UPDATE_EMAIL,
  UPDATE_MOBILE_NO_PROFILE,
  UPDATE_DATE_OF_BIRTH,
  UPDATE_PASSWORD_PROFILE,
  UPDATE_CONFIRM_PASSWORD,
  UPDATE_STATE_AND_CODE,
  SIGNUP_START,
  SIGNUP_SUCCESSFUL,
  SIGNUP_FAIL,
  REQUEST_OTP,
  REQUEST_OTP_SUCCESS,
  UPDATE_ON_SUBMEET_OTP,
  UPDATE_ON_SUBMEET_SIGNUP,
  REQUEST_OTP_FAIL,
  GET_LOCATION_START,
  GET_LOCATION_FAIL,
  GET_LOCATION_SUCCESS,
  SET_LOCATION,
  UPDATE_REGISTER_PROFILE_IMAGE_UPLOAD,
  UPDATE_REGISTER_DOCUMENT_UPLOAD,
  DELETE_REGISTER_DOCUMENT,
  UPDATE_WORSHOP_NAME,
  UPDATE_GSTIN,
  READ_FROM_CLIP_BOARD,
  UPDATE_REFERAL_CODE,
  VERIFY_GSTIN_SUCCESS,
  VERIFY_GSTIN_FAIL,
  GET_AGREE_CHECKBOX,
  UPDATE_OTP_CHANGE_MINUTE
} from "../actions/Register";
import { stateAndTin } from "../config";
import { SET_ALL_STATE_TO_INITIAL } from "../actions/ui";

const INITIAL_STATE = {
  isTwoWheeler: false,
  isFourWheeler: false,
  isHeavyVehicle: false,
  isTowingService: false,
  isTyreService: false,
  isVendor: false,
  mobileno: "",
  otpTimeOut: 59,
  otpMinute: 9,
  isOtpTimedOut: false,
  otp: "",
  visibleModalProfile: false,
  visibleModalOtp: false,
  workshop_name: "",
  name: "",
  address: "",
  mobilenoProfile: "",
  email: "",
  dateOfBirth: "",
  password: "",
  confirmPassword: "",
  language: "",
  loadingSignupB: false,
  recievedOTP: "",
  loading: false,
  onSubmeetOtpForm: false,
  onSubmeetSignupForm: false,
  onSubmeetMobileForm: false,
  requestOtpFail: false,
  requestOtpMessage: "",
  requestOtpSuccess: false,
  locationVendor: null,
  errorMessage: null,
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0,
  longitudeDelta: 0,
  setLocationVisible: false,
  signupFail: "",
  imageBase64Register: "",
  imageRegisterUri: "",
  documentRegisterUri: [],
  documentBase64Register: [],
  gstin: "",
  referalCode: "",
  isVerifed: null,
  sateAndCode: stateAndTin,
  agreeCheckbox: false
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_VEHICLE_BOOL:
      {
        return {
          ...state,
          isTwoWheeler: !state.isTwoWheeler
        };
      }
      break;

    case UPDATE_CAR_BOOL:
      {
        return {
          ...state,
          isFourWheeler: !state.isFourWheeler
        };
      }
      break;

    case UPDATE_HEAVY_VEHICLE_BOOL:
      {
        return {
          ...state,
          isHeavyVehicle: !state.isHeavyVehicle
        };
      }
      break;

    case UPDATE_TOWING_SERVICE_BOOL:
      {
        return {
          ...state,
          isTowingService: !state.isTowingService
        };
      }
      break;

    case UPDATE_TYRE_SERVICE_BOOL:
      {
        return {
          ...state,
          isTyreService: !state.isTyreService
        };
      }
      break;

    case UPDATE_USER_TYPE:
      {
        return {
          ...state,
          isVendor: action.payload
        };
      }
      break;

    case UPDATE_MOBILE_NO:
      {
        return {
          ...state,
          mobileno: action.payload,
          onSubmeetMobileForm: false,
          loading: false,
          requestOtpFail: false
        };
      }
      break;

    case UPDATE_OTP_TIMEOUT:
      {
        return {
          ...state,
          otpTimeOut: state.otpTimeOut - 1
        };
      }
      break;

    case UPDATE_OTP_CHANGE_MINUTE:
      {
        return {
          ...state,
          otpMinute: state.otpMinute - 1,
          otpTimeOut: 59,
          recievedOTP:
            state.otpMinute === 0 && state.otpTimeOut === 0
              ? ""
              : state.recievedOTP
        };
      }
      break;

    case SET_TIME_OUT:
      {
        return {
          ...state,
          otpTimeOut: INITIAL_STATE.otpTimeOut,
          otpMinute: INITIAL_STATE.otpMinute
        };
      }
      break;

    case ON_OTP_CHANGE:
      {
        return {
          ...state,
          otp: action.payload,
          onSubmeetOtpForm: false
        };
      }
      break;

    case TOGGLE_MODAL_PROFILE:
      {
        return {
          ...state,
          visibleModalProfile: action.payload
        };
      }
      break;

    case TOGGLE_MODAL_OTP:
      {
        return {
          ...state,
          visibleModalOtp: !state.visibleModalOtp
        };
      }
      break;

    case UPDATE_WORSHOP_NAME:
      {
        return {
          ...state,
          workshop_name: action.payload,
          onSubmeetSignupForm: false
        };
      }
      break;

    case UPDATE_NAME:
      {
        return {
          ...state,
          name: action.payload,
          onSubmeetSignupForm: false,
          signupFail: ""
        };
      }
      break;

    case UPDATE_ADDRESS:
      {
        return {
          ...state,
          address: action.payload,
          onSubmeetSignupForm: false,
          signupFail: ""
        };
      }
      break;

    case UPDATE_MOBILE_NO_PROFILE:
      {
        return {
          ...state,
          mobilenoProfile: action.payload,
          onSubmeetSignupForm: false
        };
      }
      break;

    case UPDATE_GSTIN:
      {
        return {
          ...state,
          gstin: action.payload
        };
      }
      break;

    case UPDATE_EMAIL:
      {
        return {
          ...state,
          email: action.payload,
          onSubmeetSignupForm: false,
          signupFail: ""
        };
      }
      break;

    case UPDATE_DATE_OF_BIRTH:
      {
        return {
          ...state,
          dateOfBirth: action.payload
        };
      }
      break;

    case UPDATE_PASSWORD_PROFILE:
      {
        return {
          ...state,
          password: action.payload,
          onSubmeetSignupForm: false
        };
      }
      break;

    case UPDATE_CONFIRM_PASSWORD:
      {
        return {
          ...state,
          confirmPassword: action.payload,
          onSubmeetSignupForm: false
        };
      }
      break;

    case UPDATE_STATE_AND_CODE:
      {
        return {
          ...state,
          address: stateAndTin[action.payload]
        };
      }
      break;

    case SIGNUP_START:
      {
        return {
          ...state,
          loadingSignupB: true
        };
      }
      break;

    case SIGNUP_SUCCESSFUL:
      {
        return {
          ...state,
          setLocationVisible: false,
          loadingSignupB: false,
          visibleModalProfile: true,
          signupFail: "",
          mobileno: "",
          otp: "",
          recievedOTP: "",
          name: "",
          address: "",
          mobilenoProfile: "",
          email: "",
          password: "",
          confirmPassword: "",
          isTwoWheeler: false,
          isFourWheeler: false,
          onSubmeetSignupForm: false
        };
      }
      break;

    case SIGNUP_FAIL:
      {
        return {
          ...state,
          setLocationVisible: false,
          loadingSignupB: false,
          signupFail: action.payload
        };
      }
      break;

    case REQUEST_OTP: {
      return {
        ...state,
        loading: true
      };
    }

    case REQUEST_OTP_SUCCESS:
      {
        return {
          ...state,
          recievedOTP: action.payload.toString(),
          loading: false,
          requestOtpFail: false,
          requestOtpSuccess: true
        };
      }
      break;

    case REQUEST_OTP_FAIL:
      {
        return {
          ...state,
          loading: false,
          requestOtpMessage: action.payload,
          onSubmeetMobileForm: true,
          requestOtpFail: true
        };
      }
      break;

    case UPDATE_ON_SUBMEET_OTP:
      {
        return {
          ...state,
          onSubmeetOtpForm: true
        };
      }
      break;

    case UPDATE_ON_SUBMEET_SIGNUP:
      {
        return {
          ...state,
          onSubmeetSignupForm: true
        };
      }
      break;

    case GET_LOCATION_START:
      {
        return {
          ...state,
          onSubmeetSignupForm: true
        };
      }
      break;

    case GET_LOCATION_FAIL:
      {
        return {
          ...state,
          errorMessage: action.payload
        };
      }
      break;

    case GET_LOCATION_SUCCESS:
      {
        return {
          ...state,
          locationVendor: action.payload
        };
      }
      break;

    case SET_LOCATION:
      {
        return {
          ...state,
          setLocationVisible: !state.setLocationVisible
        };
      }
      break;

    case UPDATE_REGISTER_PROFILE_IMAGE_UPLOAD:
      {
        return {
          ...state,
          imageRegisterUri: action.payload.uri,
          imageBase64Register: action.payload.base64
        };
      }
      break;

    case UPDATE_REGISTER_DOCUMENT_UPLOAD:
      {
        return {
          ...state,
          documentRegisterUri: [
            ...state.documentRegisterUri,
            action.payload.uri
          ],
          documentBase64Register: [
            ...state.documentBase64Register,
            action.payload.base64
          ]
        };
      }

      break;

    case DELETE_REGISTER_DOCUMENT:
      {
        return {
          ...state,
          documentRegisterUri: [...action.payload.documentRegisterUri],
          documentBase64Register: [...action.payload.documentBase64Register]
        };
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

    case READ_FROM_CLIP_BOARD:
      {
        return {
          ...state,
          referalCode: action.payload
        };
      }
      break;

    case UPDATE_REFERAL_CODE:
      {
        return {
          ...state,
          referalCode: action.payload
        };
      }
      break;

    case VERIFY_GSTIN_SUCCESS:
      {
        return {
          ...state,
          isVerifed: true
        };
      }
      break;

    case VERIFY_GSTIN_FAIL:
      {
        return {
          ...state,
          isVerifed: false
        };
      }
      break;

    case GET_AGREE_CHECKBOX:
      {
        return {
          ...state,
          agreeCheckbox: !state.agreeCheckbox
        };
      }
      break;

    default:
      return state;
      break;
  }
};
