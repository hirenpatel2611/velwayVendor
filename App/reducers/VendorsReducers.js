import {
  GET_FUTURE_BOOKING_LIST_START,
  GET_FUTURE_BOOKING_LIST_SUCCESS,
  GET_FUTURE_BOOKING_LIST_FAIL,
  GET_CUSTOMER_DISTANCELIST,
  GET_BOOKING_MODAL,
  GET_CUSTOMER_CURRENT_DISTANCE,
  GET_BOOKING_UAPDATE_START,
  GET_BOOKING_UAPDATE_SUCCESS,
  GET_BOOKING_UAPDATE_FAIL,
  GET_MECHANIC_OTP,
  OTP_DONE,
  GET_BOOKINGLIST_APPROVE_START,
  GET_BOOKINGLIST_APPROVE_SUCCESS,
  GET_BOOKINGLIST_APPROVE_FAIL,
  GET_BOOKING_VENDOR_STATUS,
  GET_CANCLE_BOOKING_MODAL,
  GET_REASON_CHECKBOX_VENDOR,
  BOOKING_LIST_CANCLE_SUCCESS,
  BOOKING_LIST_CANCLE_FAIL,
  BOOKING_CANCLE_START,
  GET_CANCEL_BOOKING_MODAL_CLOSE_VENDOR,
  GET_FUTURE_BOOKING_LIST_NO_FOUND,
  UPDATE_VENDOR_FULL_NAME,
  UPDATE_VENDOR_ADDRESS,
  UPDATE_VENDOR_STATE_AND_CODE,
  UPDATE_VENDOR_EMAIL,
  UPDATE_VENDOR_GSTIN,
  UPDATE_VENDOR_PROFILE_START,
  LOAD_VENDOR_PROFILE,
  UPDATE_VENDOR_PROFILE_IMAGE_UPLOAD,
  UPDATE_VENDOR_PROFILE_SUCCESS,
  UPDATE_VENDOR_PROFILE_FAIL,
  START_MAP_VENDOR_START,
  START_MAP_VENDOR_BOOKING_UPDATE_SUCCESS,
  MECHANIC_OTP_SUBMEET_SUCCESS,
  COMPELETE_BOOKING_BY_VENDOR,
  MECHANIC_OTP_SUBMEET_FAIL,
  GET_CUSTOMER_RATING,
  GET_CUSTOMER_RATING_MODAL,
  GET_RATING_TO_CUSTOMER_START,
  GET_RATING_TO_CUSTOMER_SUCCESS,
  OTP_SHARE,
  OTP_SHARE_SUCCESS,
  VENDOR_NEXT_BOOKING,
  GET_RATING_TO_CUSTOMER_FAIL,
  GET_INPUT_WALLET_AMOUNT,
  ADD_BALANCE_REQUEST_START,
  ADD_BALANCE_REQUEST_SUCCESS,
  GET_WALLET_PAYMENTID,
  PAYMENT_SUCCESS_OK,
  GET_WALLET_AMOUNT_START,
  GET_WALLET_AMOUNT_SUCCESS,
  ADD_WALLET_PAYMENT_SUCCESS,
  LOAD_MORE_BOOKING_LIST,
  UPDATE_VENDOR_WORSHOP_NAME,
  UPDATE_VENDOR_PROFILE_VEHICLE_BOOL,
  UPDATE_VENDOR_PROFILE_CAR_BOOL,
  UPDATE_VENDOR_PROFILE_HEAVYVEHICLE_BOOL,
  GET_VENDOR_STATUS,
  VENDER_ACTIVATION_SUCCESS,
  VENDER_ACTIVATION_FAIL,
  CLOSE_PAYMENT_PAGE,
  FETCH_LEDGER_HISTORY_START,
  FETCH_LEDGER_HISTORY_SUCCESS,
  FETCH_LEDGER_HISTORY_FAIL,
  HISTORY_DROPDOWN_FILTER,
  ON_PRESS_OK_PENDING_MODAL,
  ON_PRESS_HELP,
  ON_CLOSE_HELP_MODAL,
  UPDATE_VENDOR_DOCUMENT_UPLOAD,
  LOAD_VENDOR_PROFILE_URI_TO_BASE64,
  ON_DELETE_VENDOR_DOCUMENT,
  LOAD_VENDOR_PROFILE_URI_TO_BASE64_START,
  LOAD_VENDOR_PROFILE_URI_TO_BASE64_SUCCESS,
  ON_PRESS_DEMOSTRATION,
  ON_CLOSE_DEMO_MODAL
} from "../actions/Vendors";
import {
  SET_ALL_STATE_TO_INITIAL,
  GET_USER_STATUS_PENDING
} from "../actions/ui";
import { stateAndTin } from "../config";

const INITIAL_STATE = {
  loadingFutureBookigList: false,
  isFutureBookingListFail: false,
  vendorBookingList: [],
  FutureBookingList: [],
  isBooking: false,
  bookingData: "",
  loadingBookigUpdate: false,
  mechanicOTP: "",
  isMechanicOtp: false,
  bookingStatus: "",
  bookUserData: "",
  bookingVendorStatus: "",
  cancleBookingId: "",
  isConfirmModal: false,
  reasonCheckboxVendor: "",
  cancleReasonVendor: "",
  confirmDisableVendor: false,
  cancelBookingData: null,
  loadingConfirm: false,
  isFutureBookingNoFound: false,
  onSubmeetProfileVendorForm: false,
  workshop_nameVendor: "",
  fullNameVendor: "",
  addressVendor: "",
  emailVendor: "",
  gstinVendor: "",
  imageVendorUri: "",
  imageBase64Vendor: "",
  loadingProfileUpdate: false,
  customerDistance: "",
  loadingStartMap: false,
  customerLocation: "",
  mechanicBookedData: "",
  modalCustomerRating: false,
  customerRating: "",
  ratingId: "",
  loadingRating: false,
  bookings: "",
  walletAmount: "",
  loadingAddBalace: false,
  WalletOrderId: "",
  paymentId: "",
  successPaymentModal: false,
  walletBalance: 0,
  pages: 1,
  paginate: false,
  bookingModalData: "",
  vendorProfileServiceType: [false, false, false, false, false],
  isVendorActive: false,
  ledgerHistory: [],
  ledgerHistoryFilter: [],
  fetchLedgerHistorySuccess: false,
  loadingHistory: false,
  isStatusPendingModal: false,
  isHelpModal: false,
  documentVendorUri: [],
  documentVendorBase64: [],
  loadingImageBase64: false,
  isDemoModal: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_FUTURE_BOOKING_LIST_START:
      {
        return {
          ...state,
          loadingFutureBookigList: true
        };
      }
      break;
    case GET_FUTURE_BOOKING_LIST_SUCCESS:
      {
        return {
          ...state,
          loadingFutureBookigList: false,
          vendorBookingList: action.payload,
          isFutureBookingNoFound: false,
          paginate: false
        };
      }
      break;

    case GET_FUTURE_BOOKING_LIST_FAIL:
      {
        return {
          ...state,
          loadingFutureBookigList: false,
          isFutureBookingListFail: true,
          isFutureBookingNoFound: false
        };
      }
      break;

    case GET_CUSTOMER_DISTANCELIST:
      {
        return {
          ...state,
          FutureBookingList: action.payload
        };
      }
      break;

    case GET_BOOKING_MODAL:
      // let newFuturBookingList = state.FutureBookingList;
      {
        return {
          ...state,
          isBooking: true,
          bookings: action.payload.message,
          bookingData: action.payload.message.bookData,
          bookUserData: action.payload.message.userData,
          customerLocation: action.payload.message.location,
          bookingModalData: action.payload,
          pages: 1
        };
      }
      break;

    case GET_CUSTOMER_CURRENT_DISTANCE:
      {
        return {
          ...state,
          customerDistance: action.payload
        };
      }
      break;

    case GET_BOOKING_UAPDATE_SUCCESS:
      {
        return {
          ...state,
          loadingBookigUpdate: false,
          bookingStatus: action.payload,
          isBooking: false,
          FutureBookingList: [...action.payload.FutureBookingList]
        };
      }
      break;

    case GET_BOOKING_UAPDATE_FAIL:
      {
        return {
          ...state,
          loadingBookigUpdate: false
        };
      }
      break;

    case GET_BOOKING_UAPDATE_START:
      {
        return {
          ...state,
          loadingBookigUpdate: true
        };
      }
      break;

    case GET_MECHANIC_OTP:
      {
        return {
          ...state,
          mechanicOTP: action.payload,
          isBooking: false,
          isMechanicOtp: true
        };
      }
      break;

    case OTP_DONE:
      {
        return {
          ...state,

          FutureBookingList: [...action.payload]
        };
      }
      break;

    case GET_BOOKINGLIST_APPROVE_START:
      {
        return {
          ...state,
          loadingBookigUpdate: true
        };
      }
      break;

    case GET_BOOKINGLIST_APPROVE_SUCCESS:
      {
        return {
          ...state,
          loadingBookigUpdate: false,
          FutureBookingList: [...action.payload.FutureBookingList]
        };
      }
      break;

    case GET_BOOKINGLIST_APPROVE_FAIL:
      {
        return {
          ...state,
          loadingBookigUpdate: false
        };
      }
      break;

    case GET_BOOKING_VENDOR_STATUS:
      {
        return {
          ...state,
          bookingVendorStatus: action.payload.data,
          FutureBookingList: [...action.payload.FutureBookingList],
          isMechanicOtp: false,
          isBooking: false
        };
      }
      break;

    case GET_CANCLE_BOOKING_MODAL:
      {
        return {
          ...state,
          isBooking: false,
          cancelBookingData: action.payload,
          isConfirmModal: true
        };
      }
      break;

    case GET_REASON_CHECKBOX_VENDOR:
      {
        newReasonCheckbox = [false, false, false, false];
        newReasonCheckbox[action.payload] = true;
        newCancleReason = [
          "I am on another call.",
          "Did not match my price.",
          "Bad behaviour of customer",
          "Not Available."
        ];
        return {
          ...state,
          reasonCheckboxVendor: newReasonCheckbox,
          cancleReasonVendor: newCancleReason[action.payload],
          confirmDisableVendor: true
        };
      }
      break;

    case BOOKING_LIST_CANCLE_SUCCESS:
      {
        return {
          ...state,
          FutureBookingList: [...action.payload.FutureBookingList],
          isConfirmModal: false,
          cancleReasonVendor: null,
          reasonCheckboxVendor: [false, false, false, false],
          loadingConfirm: false
        };
      }
      break;

    case BOOKING_LIST_CANCLE_FAIL:
      {
        return {
          ...state,
          loadingConfirm: false
        };
      }
      break;

    case BOOKING_CANCLE_START:
      {
        return {
          ...state,
          loadingConfirm: true
        };
      }
      break;

    case GET_CANCEL_BOOKING_MODAL_CLOSE_VENDOR:
      {
        return {
          ...state,
          isConfirmModal: false,
          reasonCheckboxVendor: [false, false, false, false]
        };
      }
      break;

    case GET_FUTURE_BOOKING_LIST_NO_FOUND:
      {
        return {
          ...state,
          isFutureBookingNoFound: true,
          loadingFutureBookigList: false
        };
      }
      break;

    case UPDATE_VENDOR_WORSHOP_NAME:
      {
        return {
          ...state,
          workshop_nameVendor: action.payload
        };
      }
      break;

    case UPDATE_VENDOR_FULL_NAME:
      {
        return {
          ...state,
          fullNameVendor: action.payload,
          onSubmeetProfileVendorForm: false
        };
      }
      break;

    case UPDATE_VENDOR_ADDRESS:
      {
        return {
          ...state,
          addressVendor: action.payload,
          onSubmeetProfileVendorForm: false
        };
      }
      break;

    case UPDATE_VENDOR_STATE_AND_CODE:
      {
        return {
          ...state,
          addressVendor: stateAndTin[action.payload]
        };
      }
      break;

    case UPDATE_VENDOR_EMAIL:
      {
        return {
          ...state,
          emailVendor: action.payload,
          onSubmeetProfileVendorForm: false
        };
      }
      break;

    case UPDATE_VENDOR_GSTIN:
      {
        return {
          ...state,
          gstinVendor: action.payload,
          onSubmeetProfileVendorForm: false
        };
      }
      break;

    case UPDATE_VENDOR_PROFILE_START:
      {
        return {
          ...state,
          onSubmeetProfileVendorForm: true,
          loadingProfileUpdate: true
        };
      }
      break;

    case UPDATE_VENDOR_PROFILE_SUCCESS:
      {
        return {
          ...state,
          loadingProfileUpdate: false
        };
      }
      break;

    case UPDATE_VENDOR_PROFILE_FAIL:
      {
        return {
          ...state,
          loadingProfileUpdate: false
        };
      }
      break;

    case LOAD_VENDOR_PROFILE:
      {
        var vendorServiceType = [false, false, false, false, false];
        action.payload.userVehicleType.map(VehicleType => {
          switch (VehicleType) {
            case "bike":
              return (vendorServiceType[0] = true);
              break;

            case "car":
              return (vendorServiceType[1] = true);
              break;

            case "Heavy_Vehicle":
              return (vendorServiceType[2] = true);
              break;

            case "Towing_Service":
              return (vendorServiceType[3] = true);
              break;

            case "Tyre_Service":
              return (vendorServiceType[4] = true);
              break;
            default:
              vendorServiceType;
          }
        });
        console.log(action.payload);
        return {
          ...state,
          loadingImageBase64: true,
          workshop_nameVendor: action.payload.workshop_name,
          gstinVendor: action.payload.userGstin,
          fullNameVendor: action.payload.userFullName,
          addressVendor: JSON.parse(action.payload.userAddress),
          emailVendor: action.payload.userEmail,
          imageVendorUri: action.payload.uri,
          vendorProfileServiceType: vendorServiceType,
          documentVendorUri: action.payload.other_image.length
            ? action.payload.other_image
            : []
        };
      }
      break;

    case LOAD_VENDOR_PROFILE_URI_TO_BASE64:
      {
        var sss = false;
        if (
          state.documentVendorBase64.length ===
          state.documentVendorUri.length - 1
        ) {
          sss = true;
        }
        return {
          ...state,
          documentVendorBase64: [...state.documentVendorBase64, action.payload],
          loadingImageBase64: false
        };
      }
      break;

    case UPDATE_VENDOR_PROFILE_IMAGE_UPLOAD:
      {
        return {
          ...state,
          imageVendorUri: action.payload.uri,
          imageBase64Vendor: action.payload.base64
        };
      }
      break;

    case START_MAP_VENDOR_START:
      {
        return {
          ...state,
          loadingStartMap: true
        };
      }
      break;

    case START_MAP_VENDOR_BOOKING_UPDATE_SUCCESS:
      {
        return {
          ...state,
          loadingStartMap: false,
          isMechanicOtp: false,
          FutureBookingList: [...action.payload.FutureBookingList]
        };
      }
      break;

    case MECHANIC_OTP_SUBMEET_FAIL:
      {
        return {
          ...state,
          loadingStartMap: false
        };
      }
      break;

    case MECHANIC_OTP_SUBMEET_SUCCESS:
      {
        return {
          ...state,
          mechanicBookedData: action.payload
        };
      }
      break;

    case COMPELETE_BOOKING_BY_VENDOR:
      {
        return {
          ...state,
          FutureBookingList: [...action.payload.FutureBookingList],
          mechanicOTP: "",
          mechanicBookedData: "",
          ratingId: action.payload.val
        };
      }
      break;

    case GET_CUSTOMER_RATING_MODAL:
      {
        return {
          ...state,
          modalCustomerRating: true
        };
      }
      break;

    case GET_CUSTOMER_RATING:
      {
        return {
          ...state,
          customerRating: action.payload
        };
      }
      break;

    case GET_RATING_TO_CUSTOMER_START:
      {
        return {
          ...state,
          loadingRating: true
        };
      }
      break;

    case GET_RATING_TO_CUSTOMER_SUCCESS:
      {
        return {
          ...state,
          modalCustomerRating: false,
          loadingRating: false,
          customerRating: 0
        };
      }
      break;

    case GET_RATING_TO_CUSTOMER_FAIL:
      {
        return {
          ...state,
          loadingRating: false
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

    case OTP_SHARE:
      {
        return {
          ...state
        };
      }
      break;

    case OTP_SHARE_SUCCESS:
      {
        return {
          ...state,
          isMechanicOtp: false
        };
      }
      break;

    case VENDOR_NEXT_BOOKING:
      {
        return {
          ...state,
          loadingStartMap: false,
          isMechanicOtp: false,
          FutureBookingList: [...action.payload.FutureBookingList],
          bookings: [...action.payload.ar],
          isBooking: true
        };
      }
      break;

    case GET_INPUT_WALLET_AMOUNT:
      {
        return {
          ...state,
          walletAmount: action.payload
        };
      }
      break;

    case ADD_BALANCE_REQUEST_START:
      {
        return {
          ...state,
          loadingAddBalace: true
        };
      }
      break;

    case ADD_BALANCE_REQUEST_SUCCESS:
      {
        return {
          ...state,
          WalletOrderId: action.payload,
          loadingAddBalace: false
        };
      }
      break;

    case GET_WALLET_PAYMENTID:
      {
        return {
          ...state,
          paymentId: action.payload,

          successPaymentModal: true
        };
      }
      break;

    case PAYMENT_SUCCESS_OK:
      {
        return {
          ...state,

          successPaymentModal: false
        };
      }
      break;

    case GET_WALLET_AMOUNT_START:
      {
        return {
          ...state
        };
      }
      break;

    case GET_WALLET_AMOUNT_SUCCESS:
      {
        return {
          ...state,
          walletBalance: action.payload.total
        };
      }
      break;

    case ADD_WALLET_PAYMENT_SUCCESS:
      {
        return {
          ...state,
          WalletOrderId: "",
          walletAmount: ""
        };
      }
      break;

    case LOAD_MORE_BOOKING_LIST:
      {
        return {
          ...state,
          pages: action.payload,
          paginate: true
        };
      }
      break;

    case UPDATE_VENDOR_PROFILE_VEHICLE_BOOL:
      {
        return {
          ...state,
          vendorProfileServiceType: [...action.payload]
        };
      }
      break;

    case UPDATE_VENDOR_PROFILE_CAR_BOOL:
      {
        return {
          ...state,
          vendorProfileServiceType: [...action.payload]
        };
      }
      break;

    case UPDATE_VENDOR_PROFILE_HEAVYVEHICLE_BOOL:
      {
        return {
          ...state,
          vendorProfileServiceType: [...action.payload]
        };
      }
      break;

    case GET_VENDOR_STATUS:
      {
        return {
          ...state,
          isVendorActive: action.payload
        };
      }
      break;

    case VENDER_ACTIVATION_SUCCESS:
      {
        return {
          ...state,
          isVendorActive: !state.isVendorActive
        };
      }
      break;

    case VENDER_ACTIVATION_FAIL:
      {
        return {
          ...state
        };
      }
      break;

    case CLOSE_PAYMENT_PAGE:
      {
        return {
          ...state,
          WalletOrderId: "",
          walletAmount: ""
        };
      }
      break;

    case FETCH_LEDGER_HISTORY_START:
      {
        return {
          ...state,
          loadingHistory: true
        };
      }
      break;

    case FETCH_LEDGER_HISTORY_SUCCESS:
      {
        return {
          ...state,
          ledgerHistory: action.payload.data,
          ledgerHistoryFilter: action.payload.data,
          fetchLedgerHistorySuccess: true,
          loadingHistory: false
        };
      }
      break;

    case FETCH_LEDGER_HISTORY_FAIL:
      {
        return {
          ...state,
          loadingHistory: false,
          fetchLedgerHistorySuccess: false
        };
      }
      break;

    case GET_USER_STATUS_PENDING:
      {
        return {
          ...state,
          isStatusPendingModal: true
        };
      }
      break;

    case ON_PRESS_OK_PENDING_MODAL:
      {
        return {
          ...state,
          isStatusPendingModal: false
        };
      }
      break;

    case HISTORY_DROPDOWN_FILTER:
      {
        return {
          ...state,
          ledgerHistory: [...action.payload],
          fetchLedgerHistorySuccess: true
        };
      }
      break;

    case ON_PRESS_HELP:
      {
        return {
          ...state,
          isHelpModal: true
        };
      }
      break;

    case ON_CLOSE_HELP_MODAL:
      {
        return {
          ...state,
          isHelpModal: false
        };
      }
      break;

    case UPDATE_VENDOR_DOCUMENT_UPLOAD:
      {
        return {
          ...state,
          documentVendorUri: [...state.documentVendorUri, action.payload.uri],
          documentVendorBase64: [
            ...state.documentVendorBase64,
            action.payload.base64
          ],
          loadingImageBase64: false
        };
      }
      break;

    case ON_DELETE_VENDOR_DOCUMENT:
      {
        return {
          ...state,
          documentVendorUri: [...action.payload.documentVendorUri],
          documentVendorBase64: [...action.payload.documentVendorBase64]
        };
      }
      break;

    case LOAD_VENDOR_PROFILE_URI_TO_BASE64_START:
      {
        return {
          ...state,
          loadingImageBase64: true
        };
      }
      break;

    case LOAD_VENDOR_PROFILE_URI_TO_BASE64_SUCCESS:
      {
        return {
          ...state,
          loadingImageBase64: false
        };
      }
      break;

    case ON_PRESS_DEMOSTRATION:
      {
        return {
          ...state,
          isDemoModal: true
        };
      }
      break;

    case ON_CLOSE_DEMO_MODAL:
      {
        return {
          ...state,
          isDemoModal: false
        };
      }
      break;

    default:
      return state;
      break;
  }
};
