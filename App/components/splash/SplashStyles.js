import { StyleSheet, Dimensions } from "react-native";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

var styles = StyleSheet.create({
  containerStyle: {
    justifyContent: "space-around",
    flex: 1,
    backgroundColor: "#F7F6FB"
  },
  loginButton: {
    backgroundColor: "transparent",
    height: 50,
    width: 0.75*ScreenWidth,
    borderRadius: 25,
    borderColor: "#7960FF",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  createButton: {
    backgroundColor: "#7960FF",
    height: 50,
    width: 0.75*ScreenWidth,
    borderRadius: 25,

    alignItems: "center",
    marginBottom: 10,
    // color: 'white',
    justifyContent: "center"
  },
  buttonText: {
    padding: 10,
    fontSize: 0.055*ScreenWidth,
    fontFamily: "circular-book"
  },
  themeColor: {
    color: "#7960FF"
  },
  whiteText: {
    color: "white"
  },
  midTextStyle: {
    fontSize: 16,
    textAlign: "center",
    width: 350,
    marginTop: 16,
    fontFamily: "circular-book",
    color: "#696969"
  },
  midTextStyle1: {
    fontSize: 16,
    textAlign: "center",
    width: 350,
    fontFamily: "circular-book",
    color: "#696969"
  },
  mainViewStyle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    marginTop: 75
  },
  imageViewstyle: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24
  },
  imageMechanic: {
    width: 96,
    height: 110
  },
  image2: {
    width: 34,
    height: 48
  },
  image3: {
    width: 64,
    height: 47,
    marginRight: 25,
    marginLeft: 25
  },
  image4: {
    width: 48,
    height: 48
  },
  subViewStyle: {
    alignItems: "center",
    marginTop: 16
  },
  titleTextStyle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "circular-bold",
    color: "#303030"
  },
  buttonViewstyle: {
    alignItems: "center",
    marginBottom: 40
  }

});
export default styles;
