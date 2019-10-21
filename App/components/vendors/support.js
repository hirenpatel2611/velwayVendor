import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  Share
} from "react-native";
import { connect } from "react-redux";
import call from "react-native-phone-call";
import * as OpenAnything from "react-native-openanything";
import {
  onPressHelp,
  onCloseHelpModal,
  onPressTermsAndCondition,
  onPressDemostration,
  onCloseDemoModal,
  onPressYoutube
} from "../../actions";
import Header from "../../Common/Header";
import { CALL } from "../../images";

let ScreenHeight = Dimensions.get("window").height;

class support extends Component {
  calltocutomer(mobileno) {
    const args = {
      number: "+919158797607",
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
    };

    call(args).catch(console.error);
    this.props.onCloseHelpModal();
  }

  mailTo() {
    OpenAnything.Email("help.partner@velway.in");
    this.props.onCloseHelpModal();
  }
  shareMechanicApp = () => {
    var playStoreUrl =
      "https://expo.io/artifacts/e83af7ea-bfee-4e0c-b042-2d76ed881594";
    Share.share({
      message: playStoreUrl
    }).then(response => {});
  };

  render() {
    return (
      <View
        style={[
          inStyle.containerStyle,
          {
            opacity: this.props.isHelpModal || this.props.isDemoModal ? 0.3 : 1
          }
        ]}
      >
        <Header headerText="Support" />
        <ScrollView style={inStyle.ScrollViewStyle}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                this.props.onPressHelp();
              }}
              style={[inStyle.itemContainerStyle, { tintColor: "#7960FF" }]}
            >
              <Image
                style={inStyle.imageStyle}
                source={{ uri: "http://ilifenetwork.com/api/web/HelpIcon.png" }}
              />
              <Text style={inStyle.textStyle}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={inStyle.itemContainerStyle}
              onPress={() => {
                this.props.onPressTermsAndCondition();
              }}
            >
              <Image
                style={inStyle.imageStyle}
                source={{ uri: "http://ilifenetwork.com/api/web/T_C-icon.png" }}
              />
              <Text style={inStyle.textStyle}>Terms & Conditions</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                this.shareMechanicApp();
              }}
              style={inStyle.itemContainerStyle}
            >
              <Image
                style={inStyle.imageStyle}
                source={{ uri: "http://ilifenetwork.com/api/web/icon2.png" }}
              />
              <Text style={inStyle.textStyle}>App For Staff</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.onPressDemostration();
              }}
              style={inStyle.itemContainerStyle}
            >
              <Image
                style={inStyle.imageStyle}
                source={{
                  uri: "http://ilifenetwork.com/api/web/VideoIcon.png"
                }}
              />
              <Text style={inStyle.textStyle}>Demonstration</Text>
              {
                //Demonstration
              }
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          visible={this.props.isHelpModal}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
          animationType="slide"
          transparent={true}
          opacity={0.5}
          style={inStyle.modalStyle}
        >
          <View style={inStyle.modalHelpContainer}>
            <Text
              style={inStyle.closeTextStyle}
              onPress={() => {
                this.props.onCloseHelpModal();
              }}
            >
              X
            </Text>

            <TouchableOpacity
              style={inStyle.buttonStyle}
              onPress={() => {
                this.mailTo();
              }}
            >
              <Image
                style={inStyle.imageHelpModal}
                source={{ uri: "http://ilifenetwork.com/api/web/email.png" }}
              />
              <Text style={[inStyle.textStyle, { fontSize: 20 }]}>
                Via Email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={inStyle.buttonStyle}
              onPress={() => {
                this.calltocutomer();
              }}
            >
              <Image style={inStyle.imageHelpModal} source={CALL} />
              <Text style={[inStyle.textStyle, { fontSize: 20 }]}>
                Via Phone
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          visible={this.props.isDemoModal}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
          animationType="slide"
          transparent={true}
          opacity={0.5}
          style={inStyle.modalStyle}
        >
          <View style={inStyle.videoModalContainer}>
            <Text
              style={inStyle.closeTextStyle}
              onPress={() => {
                this.props.onCloseDemoModal();
              }}
            >
              X
            </Text>

            <TouchableOpacity
              style={inStyle.videoModalButton}
              onPress={() => {
                this.props.onPressYoutube(1);
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={{
                  uri: "http://ilifenetwork.com/api/web/VideoIcon.png"
                }}
              />
              <Text style={inStyle.modalTextStyle}>
                How to use Velway Partner App? - in Hindi
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}
const inStyle = {
  containerStyle: {
    flex: 1
  },
  ScrollViewStyle: {
    flex: 1,
    paddingTop: 10
  },
  itemContainerStyle: {
    height: 200,
    width: "47%",
    margin: 5,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 2,
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center"
  },
  imageStyle: {
    width: 50,
    height: 70,
    resizeMode: "contain",
    margin: 5
  },
  textStyle: {
    fontFamily: "circular-bold",
    fontSize: 17
  },
  modalTextStyle: {
    fontFamily: "circular-book",
    fontSize: 15,
    marginLeft: 5,
    color: "#7960FF"
  },
  modalHelpContainer: {
    marginTop: 0.4 * ScreenHeight,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    height: 150,
    margin: 15,
    borderRadius: 10,
    paddingBottom: 10,
    paddingRight: 5,
    justifyContent: "space-around",
    width: 250,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#7960FF"
  },
  closeTextStyle: {
    fontSize: 17,
    fontFamily: "circular-bold",
    color: "#7960FF",
    alignSelf: "flex-end",
    height: 20,
    width: 20
  },
  buttonStyle: {
    flexDirection: "row",
    width: 100,
    justifyContent: "space-between",
    top: -10
  },
  imageHelpModal: {
    height: 20,
    width: 20
  },
  modalStyle: {
    height: ScreenHeight,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end"
  },
  videoModalContainer: {
    marginTop: 0.4 * ScreenHeight,
    height: "20%",
    justifyContent: "center",
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#7960FF",
    backgroundColor: "#FFFFFF",
    margin: 16,
    borderRadius: 10
  },
  videoModalButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 280
  }
};

const mapStateToProps = ({ vendors }) => {
  const { isHelpModal, isDemoModal } = vendors;
  return {
    isHelpModal,
    isDemoModal
  };
};

export default connect(
  mapStateToProps,
  {
    onPressHelp,
    onCloseHelpModal,
    onPressTermsAndCondition,
    onPressDemostration,
    onCloseDemoModal,
    onPressYoutube
  }
)(support);
