import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  ScrollView,
  FlatList,
  BackHandler
} from "react-native";
import { connect } from "react-redux";
import isEmpty from "is-empty";
import { statusForVendor } from "../../config";
import styles from "./vendorStyle";
import Header from "../../Common/Header";
import {
  getFutureBookings,
  getCustomerDistanceList,
  getBookingModal,
  getBookingUpdate,
  connectTosocketApprov,
  otpShare,
  BookingListApprove,
  BookingListCancle,
  getCancleBookingModal,
  getReasonCheckboxVendor,
  getCancelBookingModalCloseVendor,
  startMapVendor,
  socketBookingCompleted,
  getCustomerRating,
  getCustomerRatingModal,
  getRatingToCustomer,
  getWalletAmount,
  loadMoreBookingList,
  onPressOkPendingModal
} from "../../actions";
import { FutureBookingList, Spinner } from "../../Common";
import { CALL, BITMAP2 } from "../../images";
import call from "react-native-phone-call";
import CheckBox from "react-native-checkbox";
import { TaskManager } from "expo";
import { Rating, AirbnbRating } from "react-native-ratings";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
let isVandor;
const LOCATION_TASK_NAME1 = "background-location-task-current";
class FutureBooking extends Component {
  componentDidMount() {
    this.props.getFutureBookings();
    this.props.getWalletAmount();
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      // works best when the goBack is async
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }
  calltocutomer(mobileno) {
    const args = {
      number: mobileno ? mobileno : 0,
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
    };

    call(args).catch(console.error);
  }
  render() {
    const { containerStyle } = styles;
    return (
      <View
        style={{
          opacity:
            this.props.isBooking ||
            this.props.isMechanicOtp ||
            this.props.modalCustomerRating ||
            this.props.isConfirmModal
              ? 0.5
              : 1
        }}
      >
        <Header headerText="Bookings" />
        <ScrollView style={inStyle.ScrollViewStyle}>
          {this.props.isFutureBookingNoFound ? (
            <Text
              style={{
                fontFamily: "circular-bold",
                alignSelf: "center",
                marginTop: 0.4 * ScreenHeight
              }}
            >
              {" "}
              No booking found
            </Text>
          ) : this.props.loadingFutureBookigList ? (
            <View
              style={{
                height: 0.8 * ScreenHeight,
                justifyContent: "center",
                alignSelf: "center"
              }}
            >
              <Spinner />
            </View>
          ) : (
            <View>
              <FlatList
                data={this.props.FutureBookingList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View
                    key={item.booking_id}
                    style={{
                      margin: 5,
                      backgroundColor: "white",
                      padding: 15,
                      borderRadius: 4,
                      justifyContent: "space-around",
                      shadowColor: "#000000",
                      shadowOffset: { width: 0, height: 3 },
                      shadowRadius: 5,
                      shadowOpacity: 0.5
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "circular-bold",
                          fontSize: 20,
                          color: "#4A4A4A"
                        }}
                      >
                        {item.customer.first_name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#7960FF",
                          fontFamily: "circular-book"
                        }}
                      >
                        Dist.(
                        {item.customer.distance ? item.customer.distance : 0})
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          item.status === "pending" ||
                          item.status === "cancle" ||
                          item.status === "completed"
                            ? null
                            : this.calltocutomer(item.customer.mobile);
                        }}
                        style={{ flexDirection: "row" }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#4A4A4A",
                            fontFamily: "circular-book"
                          }}
                        >
                          {item.customer.mobile
                            ? item.status === "pending" ||
                              item.status === "cancle" ||
                              item.status === "completed"
                              ? "xxxxxx" + item.customer.mobile.slice(-4)
                              : item.customer.mobile
                            : null}
                        </Text>
                        <Image
                          style={{ height: 20, width: 20, borderRadius: 10 }}
                          source={CALL}
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#4A4A4A",
                          fontFamily: "circular-book"
                        }}
                      >
                        {item.booking_otp}
                      </Text>

                      <Text
                        style={{
                          fontFamily: "circular-bold",
                          fontSize: 14,
                          color: "#7960FF"
                        }}
                      >
                        Status :{statusForVendor(item.status)}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10
                      }}
                    ></View>
                    {item.status === "cancle" ||
                    item.status === "completed" ? null : (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          width: 0.85 * ScreenWidth,
                          marginTop: 5
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: 75,
                            height: 28,
                            backgroundColor: "#7960FF",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 3,
                            opacity: item.booking_otp ? 1 : 0
                          }}
                          disabled={item.booking_otp ? false : true}
                          onPress={() => {
                            var startMapData = {
                              booking_id: item.booking_id,
                              customer_id: item.customer.customer_id,
                              otp: item.booking_otp,
                              customerToken: item.customer.device_token
                            };
                            item.status === "reached"
                              ? this.props.getCustomerRatingModal(item)
                              : this.props.startMapVendor(startMapData);
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontFamily: "circular-book",
                              fontSize: 14
                            }}
                          >
                            {item.status === "reached"
                              ? "complete"
                              : this.props.loadingStartMap
                              ? "Loading..."
                              : "Start Map"}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            width: 70,
                            height: 28,
                            backgroundColor: "#7960FF",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 3,
                            opacity: item.booking_otp ? 1 : 0
                          }}
                          disabled={item.booking_otp ? false : true}
                          onPress={() => {
                            this.props.otpShare(item.booking_otp);
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontFamily: "circular-book",
                              fontSize: 14
                            }}
                          >
                            Share
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            alignSelf: "flex-end",
                            opacity:
                              item.status === "pending"
                                ? this.props.walletBalance < 24
                                  ? 0.5
                                  : 1
                                : 0,
                            width: 70,
                            height: 28,
                            backgroundColor: "#4EA352",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 3
                          }}
                          disabled={
                            this.props.walletBalance < 24
                              ? true
                              : item.status === "pending"
                              ? false
                              : true
                          }
                          onPress={() => {
                            var data = {
                              booking_id: item.booking_id,
                              customer_id: item.customer.customer_id,
                              customerToken: item.customer.device_token,
                              customer_Mobile: item.customer.mobile
                            };
                            this.props.BookingListApprove(data);
                          }}
                        >
                          <Text
                            style={{
                              color: "white"
                            }}
                          >
                            {this.props.loadingBookigUpdate
                              ? "Loading..."
                              : "Approve"}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{
                            alignSelf: "flex-end",
                            opacity:
                              item.status === "cancle" ||
                              item.status === "completed"
                                ? 0
                                : 1,
                            width: 70,
                            height: 28,
                            backgroundColor: "#D35400",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 3
                          }}
                          disabled={
                            item.status === "cancle" ||
                            item.status === "completed"
                              ? true
                              : false
                          }
                          onPress={() => {
                            var cancleBookingData = {
                              booking_id: item.booking_id,
                              customer_id: item.customer.customer_id,
                              customerToken: item.customer.device_token,
                              customer_Mobile: item.customer.mobile
                            };
                            this.props.getCancleBookingModal(cancleBookingData);
                          }}
                        >
                          <Text
                            style={{
                              color: "white"
                            }}
                          >
                            Cancel
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                )}
              />
              {this.props.FutureBookingList.length > 20 ? (
                <TouchableOpacity
                  onPress={() => {
                    this.props.loadMoreBookingList();
                  }}
                  style={{
                    width: ScreenWidth,
                    paddingTop: 10,
                    paddingBottom: 20,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "circular-bold",
                      color: "#7960FF"
                    }}
                  >
                    Load More
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          )}
          <Modal
            visible={this.props.isBooking}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
            animationType="slide"
            transparent={true}
            opacity={1}
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: ScreenHeight,
              backgroundColor: "white"
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(100,100,100, 0.5)",
                height: ScreenHeight
              }}
            >
              <View
                style={{
                  marginTop: 0.3 * ScreenHeight,
                  alignSelf: "center",
                  width: 0.85 * ScreenWidth,
                  backgroundColor: "#FFFFFF",
                  padding: 10,
                  borderRadius: 4,
                  justifyContent: "space-between",
                  flexDirection: "column",
                  shadowColor: "#000000",
                  shadowOffset: { width: 0, height: 3 },
                  shadowRadius: 5,
                  shadowOpacity: 0.5
                }}
              >
                <Image
                  style={{ height: 130, width: 100, alignSelf: "center" }}
                  source={BITMAP2}
                />
                <Text
                  style={{
                    fontFamily: "circular-bold",
                    fontSize: 20,
                    color: "#4A4A4A",
                    padding: 10,
                    alignSelf: "center",
                    marginBottom: 10
                  }}
                >
                  You Have a Booking.
                </Text>
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    margin: 15
                  }}
                >
                  <View
                    style={{
                      justifyContent: "space-around"
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "circular-bold",
                        fontSize: 20,
                        color: "#4A4A4A"
                      }}
                    >
                      {this.props.bookings
                        ? this.props.bookings.userData.userFullName
                        : null}
                    </Text>
                    <TouchableOpacity
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row"
                      }}
                      onPress={() => {}}
                    >
                      <Text
                        style={{
                          fontFamily: "circular-book",
                          fontSize: 16,
                          color: "#4A4A4A",
                          marginTop: 3
                        }}
                      >
                        {this.props.bookings
                          ? "xxxxxx" +
                            this.props.bookings.userData.userMobileno.slice(-4)
                          : null}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      justifyContent: "space-around"
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "circular-book",
                        fontSize: 16,
                        color: "#4A4A4A"
                      }}
                    >
                      Distance
                    </Text>
                    <Text
                      style={{
                        fontFamily: "circular-book",
                        fontSize: 16,
                        color: "#7960FF"
                      }}
                    >
                      {this.props.customerDistance
                        ? this.props.customerDistance
                        : 0}{" "}
                      km
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    margin: 15
                  }}
                >
                  <TouchableOpacity
                    disabled={this.props.walletBalance < 24 ? true : false}
                    style={{
                      alignSelf: "flex-end",
                      width: 80,
                      height: 28,
                      backgroundColor: "#4EA352",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 3,
                      opacity: this.props.walletBalance < 24 ? 0.5 : 1
                    }}
                    onPress={async () => {
                      var val = {
                        status: "accept",
                        Id: this.props.bookings.bookData.booking_id,
                        customer_id: this.props.bookings.userData.userId,
                        customerToken: this.props.bookingModalData.fromToken,
                        referralId: this.props.bookings.bookData.customer_id,
                        customer_Mobile: this.props.bookings.userData
                          .userMobileno
                      };
                      await this.props.getBookingUpdate(val);
                    }}
                  >
                    <Text
                      style={{
                        color: "white"
                      }}
                    >
                      {this.props.loadingBookigUpdate
                        ? "loading..."
                        : "Approve"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      alignSelf: "flex-end",
                      width: 80,
                      height: 28,
                      backgroundColor: "#D35400",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 3
                    }}
                    onPress={() => {
                      var cancleBookingData = {
                        booking_id: this.props.bookings.bookData.booking_id,
                        customer_id: this.props.bookings.userData.userId,
                        customerToken: this.props.bookingModalData.fromToken,
                        customer_Mobile: this.props.bookings.userData
                          .userMobileno
                      };
                      this.props.getCancleBookingModal(cancleBookingData);
                    }}
                  >
                    <Text
                      style={{
                        color: "white"
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            visible={this.props.isMechanicOtp}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
            animationType="slide"
            transparent={true}
            opacity={1}
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: ScreenHeight,
              backgroundColor: "rgba(0,0,0,0.5)"
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(100,100,100, 0.5)",
                height: ScreenHeight
              }}
            >
              <View
                style={{
                  marginTop: 0.3 * ScreenHeight,
                  alignSelf: "center",
                  width: 0.85 * ScreenWidth,
                  backgroundColor: "#FFFFFF",
                  padding: 10,
                  borderRadius: 4,
                  justifyContent: "space-between",
                  flexDirection: "column",
                  shadowColor: "#000000",
                  shadowOffset: { width: 0, height: 3 },
                  shadowRadius: 5,
                  shadowOpacity: 0.5
                }}
              >
                <Text
                  style={{
                    fontFamily: "circular-bold",
                    fontSize: 20,
                    color: "#4A4A4A",
                    padding: 10,
                    alignSelf: "center",
                    marginBottom: 10
                  }}
                >
                  Your OTP for Mechanic.
                </Text>
                <Text
                  style={{
                    fontFamily: "circular-bold",
                    fontSize: 20,
                    color: "#4A4A4A",
                    padding: 10,
                    alignSelf: "center",
                    marginBottom: 10
                  }}
                >
                  {this.props.mechanicOTP ? this.props.mechanicOTP : null}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }}
                >
                  {this.props.mechanicBookedData ? null : (
                    <TouchableOpacity
                      style={{
                        width: 0.3 * ScreenWidth,
                        height: 28,
                        backgroundColor: "#7960FF",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 3
                      }}
                      onPress={() => {
                        var startMapData = {
                          booking_id: "",
                          customer_id: "",
                          vendor_id: "",
                          otp: this.props.mechanicOTP,
                          customerToken: this.props.bookingModalData.fromToken
                        };
                        this.props.startMapVendor(startMapData);
                      }}
                    >
                      <Text
                        style={{
                          color: "white"
                        }}
                      >
                        {this.props.loadingStartMap
                          ? "Loading..."
                          : "Start Map"}
                      </Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={{
                      width: 0.3 * ScreenWidth,
                      height: 28,
                      backgroundColor: "#7960FF",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 3
                    }}
                    onPress={() => {
                      this.props.otpShare(this.props.mechanicOTP);
                    }}
                  >
                    <Text
                      style={{
                        color: "white"
                      }}
                    >
                      Share
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            visible={this.props.isConfirmModal}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
            animationType="slide"
            transparent={true}
            opacity={0.5}
            style={inStyle.modalStyle}
          >
            <View
              style={{
                backgroundColor: "rgba(100,100,100, 0.5)",
                height: ScreenHeight
              }}
            >
              <View
                style={{
                  marginTop: 0.4 * ScreenHeight,
                  alignSelf: "stretch",
                  backgroundColor: "#FFFFFF",
                  height: 0.3 * ScreenHeight,
                  margin: 15,
                  borderRadius: 10,
                  padding: 10,
                  justifyContent: "space-around"
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 0.1 * ScreenWidth,
                    alignSelf: "flex-end"
                  }}
                  onPress={() => {
                    this.props.getCancelBookingModalCloseVendor();
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      fontFamily: "circular-bold",
                      alignSelf: "flex-end",
                      color: "#7960FF",
                      width: 0.1 * ScreenWidth
                    }}
                  >
                    x
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "circular-bold",
                    alignSelf: "center"
                  }}
                >
                  Reason of Cancel
                </Text>
                <CheckBox
                  label="I am on another call."
                  checked={this.props.reasonCheckboxVendor[0]}
                  onChange={() => {
                    this.props.getReasonCheckboxVendor(0);
                  }}
                  checkboxStyle={{
                    tintColor: "#7960FF",
                    height: 22,
                    width: 22
                  }}
                  labelStyle={{ fontFamily: "circular-bold" }}
                  containerStyle={{ padding: 3 }}
                />
                <CheckBox
                  label="Did not match my price."
                  checked={this.props.reasonCheckboxVendor[1]}
                  onChange={() => {
                    this.props.getReasonCheckboxVendor(1);
                  }}
                  checkboxStyle={{
                    tintColor: "#7960FF",
                    height: 22,
                    width: 22
                  }}
                  labelStyle={{ fontFamily: "circular-bold" }}
                  containerStyle={{ padding: 3 }}
                />
                <CheckBox
                  label="Bad behaviour of customer."
                  checked={this.props.reasonCheckboxVendor[2]}
                  onChange={() => {
                    this.props.getReasonCheckboxVendor(2);
                  }}
                  checkboxStyle={{
                    tintColor: "#7960FF",
                    height: 22,
                    width: 22
                  }}
                  labelStyle={{ fontFamily: "circular-bold" }}
                  containerStyle={{ padding: 3 }}
                />
                <CheckBox
                  label="Not Available."
                  checked={this.props.reasonCheckboxVendor[3]}
                  onChange={() => {
                    this.props.getReasonCheckboxVendor(3);
                  }}
                  checkboxStyle={{
                    tintColor: "#7960FF",
                    height: 22,
                    width: 22
                  }}
                  labelStyle={{ fontFamily: "circular-bold" }}
                  containerStyle={{ padding: 3 }}
                />
                <TouchableOpacity
                  disabled={this.props.confirmDisableVendor ? false : true}
                  style={{
                    alignSelf: "center",
                    opacity: this.props.confirmDisableVendor ? 1 : 0.5,
                    backgroundColor: "#7960FF",
                    width: 0.4 * ScreenWidth,
                    borderRadius: 5,
                    alignItems: "center",
                    margin: 10,
                    padding: 5,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  activeOpacity={1}
                  underlayColor="white"
                  onPress={() => {
                    this.props.BookingListCancle();
                  }}
                >
                  {this.props.loadingConfirm ? (
                    <Text style={inStyle.modalButtonCancleText}>
                      Loading...
                    </Text>
                  ) : (
                    <Text style={inStyle.modalButtonCancleText}>Confirm</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            visible={this.props.modalCustomerRating}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
            animationType="slide"
            transparent={true}
            opacity={0.5}
            style={inStyle.modalStyle}
          >
            <View
              style={{
                marginTop: 0.4 * ScreenHeight,
                alignSelf: "center",
                backgroundColor: "#FFFFFF",
                height: 0.25 * ScreenHeight,
                margin: 15,
                borderRadius: 10,
                padding: 10,
                justifyContent: "space-around"
              }}
            >
              <Text
                style={{
                  fontFamily: "circular-book",
                  alignSelf: "center",
                  margin: 0.01 * ScreenHeight
                }}
              >
                Rate Customer
              </Text>
              <AirbnbRating
                type="star"
                ratingBackgroundColor="transparent"
                imageSize={25}
                defaultRating={this.props.customerRating}
                showRating={false}
                onFinishRating={rating => {
                  this.props.getCustomerRating(rating);
                }}
              />
              <TouchableOpacity
                disabled={this.props.customerRating >= 1 ? false : true}
                style={{
                  alignSelf: "center",
                  backgroundColor: "#7960FF",
                  width: 0.4 * ScreenWidth,
                  borderRadius: 5,
                  alignItems: "center",
                  margin: 10,
                  padding: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: this.props.customerRating >= 1 ? 1 : 0.5
                }}
                activeOpacity={1}
                underlayColor="white"
                onPress={() => {
                  this.props.getRatingToCustomer();
                }}
              >
                <Text style={inStyle.modalButtonCancleText}>
                  {this.props.loadingRating ? "Loading..." : "Done"}
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <Modal
            visible={this.props.isStatusPendingModal}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
            animationType="slide"
            transparent={true}
            opacity={0.5}
            style={inStyle.modalStyle}
          >
            <View
              style={{
                marginTop: 0.4 * ScreenHeight,
                alignSelf: "center",
                backgroundColor: "#FFFFFF",
                height: "28%",
                borderRadius: 10,
                padding: 15,
                borderWidth: 1,
                borderColor: "#7960FF",
                justifyContent: "center"
              }}
            >
              <Image
                style={{
                  width: 150,
                  height: 70,
                  alignSelf: "center",
                  marginBottom: 3
                }}
                source={{
                  uri: "http://ilifenetwork.com/api/web/velwayIcon.png"
                }}
              />
              <Text
                style={{
                  fontFamily: "circular-book",
                  alignSelf: "center",
                  fontSize: 18
                }}
              >
                We will get back to you
              </Text>
              <Text
                style={{
                  fontFamily: "circular-book",
                  alignSelf: "center",
                  fontSize: 18
                }}
              >
                after we verify your documents.
              </Text>
              <Text
                style={{
                  alignSelf: "center",
                  fontFamily: "circular-bold",
                  color: "#7960FF",
                  top: 10,
                  fontSize: 18
                }}
                onPress={() => {
                  this.props.onPressOkPendingModal();
                }}
              >
                OK
              </Text>
            </View>
          </Modal>
        </ScrollView>
      </View>
    );
  }
}
const inStyle = {
  ScrollViewStyle: {
    height: 0.88 * ScreenHeight,
    paddingTop: 7,
    paddingBottom: 10,
    marginBottom: 35,
    paddingRight: 5,
    paddingLeft: 5
  },
  textLoading: {
    alignSelf: "center",
    paddingTop: 20
  },
  buttonReload: {
    alignSelf: "center",
    paddingTop: 20
  },
  modalButtonCancle: {
    backgroundColor: "#7960FF",
    height: 25,
    width: 70,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  modalButtonCancleText: {
    fontSize: 14,
    fontFamily: "circular-bold",
    color: "white"
  },
  modalStyle: {
    height: 0.2 * ScreenHeight,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end"
  }
};
const mapStateToProps = ({ vendors }) => {
  const {
    loadingFutureBookigList,
    isFutureBookingListFail,
    vendorBookingList,
    FutureBookingList,
    isBooking,
    bookingData,
    mechanicOTP,
    isMechanicOtp,
    loadingBookigUpdate,
    bookUserData,
    cancleBookingId,
    reasonCheckboxVendor,
    cancleReasonVendor,
    isConfirmModal,
    confirmDisableVendor,
    loadingConfirm,
    isFutureBookingNoFound,
    customerDistance,
    loadingStartMap,
    modalCustomerRating,
    customerRating,
    loadingRating,
    bookingModalData,
    bookings,
    isStatusPendingModal,
    walletBalance
  } = vendors;
  return {
    loadingFutureBookigList,
    isFutureBookingListFail,
    vendorBookingList,
    FutureBookingList,
    isBooking,
    bookingData,
    mechanicOTP,
    isMechanicOtp,
    loadingBookigUpdate,
    bookUserData,
    cancleBookingId,
    isConfirmModal,
    reasonCheckboxVendor,
    cancleReasonVendor,
    confirmDisableVendor,
    loadingConfirm,
    isFutureBookingNoFound,
    customerDistance,
    loadingStartMap,
    modalCustomerRating,
    customerRating,
    loadingRating,
    bookings,
    bookingModalData,
    isStatusPendingModal,
    walletBalance
  };
};

export default connect(
  mapStateToProps,
  {
    getFutureBookings,
    getCustomerDistanceList,
    getBookingModal,
    getBookingUpdate,
    connectTosocketApprov,
    otpShare,
    BookingListApprove,
    BookingListCancle,
    getCancleBookingModal,
    getReasonCheckboxVendor,
    getCancelBookingModalCloseVendor,
    startMapVendor,
    socketBookingCompleted,
    getCustomerRating,
    getCustomerRatingModal,
    getRatingToCustomer,
    getWalletAmount,
    loadMoreBookingList,
    onPressOkPendingModal
  }
)(FutureBooking);
