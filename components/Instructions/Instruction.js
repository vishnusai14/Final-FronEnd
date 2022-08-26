import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

const Instruction = (props) => {
  return (
    <>
      <ImageBackground
        source={props.source}
        resizeMode={"cover"}
        style={styles.image}
      >
        <View style={styles.darkness}>
          <View style={styles.box}>
            <View>
              <Text style={styles.text1}>{"Islanders"}</Text>
            </View>
            <View>
              <Text style={styles.text2}>{props.text}</Text>
            </View>
            {props.index < 4 && (
              <View>
                <Text style={styles.text2}>{"Swipe  ->"}</Text>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

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
  box: {
    // flex: 1,
    opacity: 0.5,
    width: 370,
    // heigth: 24,
    backgroundColor: "#434549",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "flex-end",
    marginHorizontal: 15,
    // bottom: 24,
    top: "80%",
    borderRadius: 12,
  },
  text1: {
    fontFamily: "mitr",
    color: "white",
    fontSize: 30,
    textAlign: "center",
  },
  text2: {
    color: "white",
    fontFamily: "Paprika",
    fontSize: 12,
    textAlign: "center",
  },
});

export default Instruction;
