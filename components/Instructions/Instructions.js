import React, { Component } from "react";
import { View, Text } from "react-native";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import Landing from "../../screen/Landing";
import Instruction from "./Instruction";

class Swiper extends React.Component {
  title = [
    {
      source: require("../../assets/image/india.png"),
      text: "Let's get Started !",
    },
    {
      source: require("../../assets/image/screen2.png"),
      text: "Drop the pin to choose the desired location ",
    },
    {
      source: require("../../assets/image/screen3.png"),
      text: "Choose an island from the drop down to know the freshwater demand ",
    },
    {
      source: require("../../assets/image/screen4.png"),
      text: "Select the date to predict fresh water and energy generated ",
    },
    {
      source: "main",
    },
  ];

  state = {
    index: 0,
  };

  onSwipeLeft(gestureState) {
    if (this.state.index === 4) {
      return;
    }
    console.log("Swiping Left");
    this.setState((prevState) => ({
      ...prevState,
      index: prevState.index + 1,
    }));
  }

  onSwipeRight(gestureState) {
    if (this.state.index === 0 || this.state.index === 4) {
      return;
    }
    console.log("Swiping right");
    this.setState((prevState) => ({
      ...prevState,
      index: prevState.index - 1,
    }));
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };

    return (
      <GestureRecognizer
        onSwipe={(s) => {
          console.log(s);
        }}
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(s) => {
          this.onSwipeRight(s);
        }}
        config={config}
        style={{
          flex: 1,
          backgroundColor: this.state.backgroundColor,
        }}
      >
        {this.state.index === 4 ? (
          <Landing />
        ) : (
          <Instruction
            source={this.title[this.state.index].source}
            text={this.title[this.state.index].text}
            index={this.state.index}
          />
        )}
      </GestureRecognizer>
    );
  }
}

export default Swiper;
