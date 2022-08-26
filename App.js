import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Main from "./screen/Main";
import Apploading from "expo-app-loading";
import * as Font from "expo-font";

const fetchFonts = () =>
  Font.loadAsync({
    Paprika: require("./assets/font/Paprika-Regular.ttf"),
    mitr: require("./assets/font/Mitr-Regular.ttf"),
  });

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <Apploading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <View style={styles.container}>
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
