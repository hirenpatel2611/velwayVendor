import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { Col, Row, Grid } from "react-native-easy-grid";
import { BITMAP } from "../../images";
import { Actions } from "react-native-router-flux";
import { setTimer, setScore, updateUserType } from "../../actions";
import _ from "lodash";
import styles from "./SplashStyles";
import TimerMixin from "react-timer-mixin";
import {
  MECHANIC,
  HAND_HOLDING_UP,
  CAR_ENGINE,
  TIMING_BELT
} from "../../images";

class SplashFront extends Component {
  render() {
    const {
      containerStyle,
      loginButton,
      createButton,
      buttonText,
      themeColor,
      whiteText,
      midTextStyle,
      midTextStyle1,
      mainViewStyle,
      imageViewstyle,
      imageMechanic,
      image2,
      image3,
      image4,
      subViewStyle,
      titleTextStyle,
      buttonViewstyle
    } = styles;
    return (
      <View style={containerStyle}>
        <StatusBar backgroundColor="#7960FF" />
        <View style={mainViewStyle}>
          <View style={{ alignItems: "center" }}>
            <Image style={imageMechanic} source={MECHANIC} />
          </View>
          <View style={imageViewstyle}>
            <Image style={image2} source={HAND_HOLDING_UP} />
            <Image style={image3} source={CAR_ENGINE} />
            <Image style={image4} source={TIMING_BELT} />
          </View>
          <View style={subViewStyle}>
            <Text style={titleTextStyle}>Lets Get Started</Text>
            <Text style={midTextStyle}>Prompt breakdown service</Text>
            <Text style={midTextStyle1}>at your finger tip</Text>
          </View>
        </View>
        <View style={buttonViewstyle}>

          <TouchableHighlight
            onPress={() => {
              this.props.updateUserType(true);
              Actions.registerMobile();
            }}
            underlayColor="white"
            style={createButton}>
              <Text style={[buttonText, whiteText]}>Join Our Network!</Text>
          </TouchableHighlight>
        
          <TouchableHighlight
            onPress={() => Actions.login()}
            underlayColor="white"
            style={loginButton}
          >
              <Text style={[buttonText, themeColor]}>Login</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ register }) => {
  const { isVendor } = register;
  return { isVendor };
};

export default connect(
  mapStateToProps,
  { setTimer, setScore, updateUserType }
)(SplashFront);
