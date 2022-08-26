import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Maps from "../components/Map/Map";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import axios from "axios";

class Landing extends React.Component {
  state = {
    expanded: false,
    cor: { latitude: 22.258, longitude: 71.19 },
    date: new Date(),
    dateAsString: format(new Date(), "MM-dd-yyyy"),
    opendate: false,
    isLoading: false,
    resdata: [],
    open: false,
    value: "",
    items: [
      { label: "Kavartti", value: "kavaratti" },
      { label: "Agatti", value: "agatti" },
      { label: "Minicoy", value: "minicoy" },
    ],
  };

  changeSelectedPlace = (cor) => {
    this.setState((prevState) => ({
      ...prevState,
      cor: cor,
      expanded: false,
    }));
  };

  changeDate = (date) => {
    this.setState((prevState) => ({
      ...prevState,
      date: date,
      dateAsString: format(date, "MM-dd-yyyy"),
      opendate: false,
    }));
  };

  showDatePicker = () => {
    this.setState((prevState) => ({
      ...prevState,
      opendate: true,
    }));
  };

  predict = () => {
    console.log(this.state);
    if (this.state.value === "") {
      this.setState((prevState) => ({
        ...prevState,
        isLoading: true,
        resdata: [],
      }));
      let data = {
        date: this.state.dateAsString,
        cor: this.state.cor,
      };
      console.log(data);
      axios
        .post("http://172.16.16.54:5000/api/v1/predict", data)
        .then((res) => {
          this.setState((prevState) => ({
            ...prevState,
            isLoading: false,
            resdata: res.data,
          }));
          console.log(res.data);
          Alert.alert(
            "Result",
            `Power : ${res.data.power[0]} Kw/h \n FreshWater : ${res.data.power[1]} Kg/s `,
            [{ text: "OK" }]
          );
        })
        .catch((err) => {
          this.setState((prevState) => ({
            ...prevState,
            isLoading: false,
            resdata: [],
          }));
          console.log(err);
        });
    } else {
      console.log("Entering to this state");
      this.setState((prevState) => ({
        ...prevState,
        isLoading: true,
        resdata: [],
      }));
      let data = {
        date: this.state.dateAsString,
        place: this.state.value,
      };
      console.log(data);
      axios
        .post("http://172.16.16.54:5000/api/v1/island", data)
        .then((res) => {
          this.setState((prevState) => ({
            ...prevState,
            isLoading: false,
            resdata: res.data,
          }));
          Alert.alert(
            "Result",
            `Power : ${res.data.power[0]} Kw/h \n FreshWater : ${res.data.power[1]} Kg/s \n Demand Satisfied : ${res.data.percent} %`,
            [{ text: "OK" }]
          );
          console.log(res.data);
        })
        .catch((err) => {
          this.setState((prevState) => ({
            ...prevState,
            isLoading: false,
            resdata: [],
          }));
          console.log(err);
        });
    }
  };

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <ActivityIndicator />
        ) : (
          <ImageBackground
            source={require("../assets/image/india.png")}
            resizeMode={"cover"}
            style={styles.image}
          >
            <View>
              <Maps
                cor={this.state.cor}
                changeCordinate={(cor) => {
                  this.changeSelectedPlace(cor);
                }}
              />
              <View>
                <View
                  style={{
                    backgroundColor: "#171717",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 15,
                  }}
                >
                  <DropDownPicker
                    onChangeSearchText={(v) => {
                      console.log(v);
                    }}
                    open={this.state.open}
                    value={this.state.value}
                    items={this.state.items}
                    setOpen={(s) => {
                      this.setState({ open: s });
                    }}
                    setValue={(v) => {
                      console.log("This is v", v());
                      this.setState({ value: v() });
                    }}
                    setItems={(i) => {
                      this.setState({ items: i });
                    }}
                    theme="DARK"
                    multiple={false}
                    dropDownDirection="TOP"
                  />
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.showDatePicker();
                }}
                style={{
                  backgroundColor: "#2b2e3d",
                  width: 360,
                  height: 47,
                  borderRadius: 5,
                  top: 70,
                  left: 18,
                }}
              >
                <Text style={styles.text}>Select Date</Text>
              </TouchableOpacity>

              {this.state.opendate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={this.state.date}
                  mode={"date"}
                  is24Hour={false}
                  onChange={(e, date) => {
                    this.changeDate(date);
                  }}
                />
              )}
              <TouchableOpacity
                onPress={() => {
                  this.showDatePicker();
                }}
                style={{
                  backgroundColor: "#1a8e80",
                  width: 360,
                  height: 47,
                  borderRadius: 5,
                  top: 80,
                  left: 18,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.predict();
                  }}
                >
                  <Text style={{ ...styles.text, textAlign: "center" }}>
                    Predict
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  darkness: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    flex: 1,
  },
  text: {
    color: "white",
    justifyContent: "center",
    alignContent: "center",
    // textAlign: "center",
    top: 11,
    fontSize: 15,
    left: 10,
  },
});

export default Landing;
