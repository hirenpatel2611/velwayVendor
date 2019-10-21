import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  AsyncStorage,
  Dimensions,
  AppState
} from "react-native";
import { Scene, Router, ActionConst,Drawer } from "react-native-router-flux";
import CardStackStyleInterpolator from "react-navigation/src/views/CardStack/CardStackStyleInterpolator";
import Login from "./components/login/Login";
import RegisterMobile from "./components/register/RegisterMobile";
import RegisterOTP from "./components/register/RegisterOTP";
import profile from "./components/register/Profile";
import SplashFront from "./components/splash/SplashFront";
import FutureBooking from "./components/vendors/FutureBooking";
import VendorProfile from "./components/vendors/Profile";
import ForgotMobile from "./components/forgotPassword/ForgotMobile";
import ForgotOTP from "./components/forgotPassword/ForgotOTP";
import ForgotResetPassword from "./components/forgotPassword/ForgotResetPassword";
import Wallet from "./components/vendors/Wallet"
import History from "./components/vendors/ledgerHistory"
import SupportVendor from "./components/vendors/support"
import isEmpty from "is-empty";




import { Actions } from "react-native-router-flux";
import {
  loadFont,
  updateLoggedInState,
  createSocketChannel,
  getUserData,
  getFutureBookings,
  createCustomerSocketChannel
} from "./actions";
import SideMenu from "./components/drawer/SideMenu";
import SideMenuVendor from "./components/drawer/SideMenuVendor";
import { Asset, SplashScreen,Notifications } from "expo";
import {getBookingVendorStatus,getBookingModal,getBookingStatus} from './actions'

import { connect } from "react-redux";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;



class RouterComponent extends Component {
  componentWillMount() {
    this.props.loadFont();
    this._retrieveData();
    SplashScreen.preventAutoHide();
  }

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }
  _handleNotification = async (notification) => {
      const isVen = await AsyncStorage.getItem("is_vendor");
      if(!isEmpty(notification.data)){
      switch (notification.data.data.type) {

        case 'BOOK':
            this.props.getBookingModal(notification.data.data);
        break;

        case 'ACCEPT':
          this.props.getBookingVendorStatus(notification.data.data);
        break;

        case 'CANCEL':
          this.props.getBookingVendorStatus(notification.data.data);
        break;

          case "ON-THE-WAY":
            this.props.getBookingVendorStatus(notification.data.data);
          break;

          case "REACHED":
              this.props.getBookingVendorStatus(notification.data.data);
            break;

        default:
          return null;
        break;
      }
    }
  };
  _handleAppStateChange = async nextAppState => {
    if (this.props.isLoggedIn) {
      const myId = await AsyncStorage.getItem("user_id");
      const valueIsvendor = await AsyncStorage.getItem("is_vendor");

        this.props.createSocketChannel(myId);
        this.props.getFutureBookings();
        this.props.getUserData();

    }
  };

  _retrieveData = async () => {
    try {
      const valueUserName = await AsyncStorage.getItem("token");
      const valueIsvendor = await AsyncStorage.getItem("is_vendor");
      const myId = await AsyncStorage.getItem("user_id");

      if (valueUserName !== null) {
          this.props.createSocketChannel(myId);
        await this.props.updateLoggedInState(true);
        await this.props.getUserData();

      } else {
        await this.props.updateLoggedInState(false);
        SplashScreen.hide();
      }
    } catch (error) {
      // Error retrieving data
      console.error(error);
    }
  };

  render() {
    if (!this.props.fontLoaded) {
      return <View />;
    }

    return (
      <Router>
        <Scene
          key="root"
          panHandlers={null}
          gesturesEnabled={false}
          transitionConfig={() => ({
            screenInterpolator: CardStackStyleInterpolator.forHorizontal
          })}
        >
          <Scene
            key="SplashFront"
            component={SplashFront}
            hideNavBar={true}
            navTransparent="true"
            type={ActionConst.RESET}
            initial={!this.props.isLoggedIn}
          />
          <Scene
            key="login"
            component={Login}
            hideNavBar={true}
            navTransparent="true"
            onBack={() => Actions.SplashFront()}
            type={ActionConst.RESET}
          />
          <Scene
            key="registerMobile"
            component={RegisterMobile}
            hideNavBar={true}
            navTransparent="true"
          />
          <Scene
            key="registerOTP"
            component={RegisterOTP}
            hideNavBar={true}
            navTransparent="true"
            type={ActionConst.RESET}
          />
          <Scene
            key="profile"
            component={profile}
            hideNavBar={true}
            navTransparent="true"
            type={ActionConst.RESET}
          />

          <Scene
            key="ForgotMobile"
            component={ForgotMobile}
            hideNavBar={true}
            navTransparent="true"
            type={ActionConst.RESET}
          />
          <Scene
            key="ForgotOTP"
            component={ForgotOTP}
            hideNavBar={true}
            navTransparent="true"
            type={ActionConst.RESET}
          />
          <Scene
            key="ForgotResetPassword"
            component={ForgotResetPassword}
            hideNavBar={true}
            navTransparent="true"
            type={ActionConst.RESET}
          />
            <Scene
              key="drawer"

              type={ActionConst.RESET}
              drawer
              drawerLockMode="locked-closed"
              initial={this.props.isLoggedIn}
              hideNavBar={true}
              drawerPosition="left"
              contentComponent={SideMenuVendor}
              drawerWidth={0.5 * ScreenWidth}
            >
              <Scene
                key="FutureBooking"
                component={FutureBooking}
                hideNavBar={true}
                navTransparent="true"
              />
              <Scene
                key="VendorProfile"
                component={VendorProfile}
                hideNavBar={true}
                navTransparent="true"
              />
              <Scene
                key="Wallet"
                component={Wallet}
                hideNavBar={true}
                navTransparent="true"
              />
              <Scene
                key="history"
                component={History}
                hideNavBar={true}
                navTransparent="true"
              />
              <Scene
                key="supportVendor"
                component={SupportVendor}
                hideNavBar={true}
                navTransparent="true"
              />
            </Scene>

        </Scene>
      </Router>
    );
  }
}
const mapStateToProps = ({ ui, user }) => {
  const { fontLoaded, isLoggedIn } = ui;

  return { fontLoaded, isLoggedIn };
};

export default connect(
  mapStateToProps,
  {
    loadFont,
    updateLoggedInState,
    createSocketChannel,
    getUserData,
    getFutureBookings,
    getBookingVendorStatus,
    getBookingModal,
    getBookingStatus,
    createCustomerSocketChannel
  }
)(RouterComponent);
