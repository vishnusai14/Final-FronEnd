import React from "react";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function App(props) {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.mapStyle}
      zoomEnabled={true}
      region={{
        latitude: props.cor.latitude,
        longitude: props.cor.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <MapView.Marker
        draggable
        coordinate={props.cor}
        onDragEnd={(e) => props.changeCordinate(e.nativeEvent.coordinate)}
        title={"title"}
        description={"test"}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    height: 374,
    width: 319,
    // alignItems: "center",
    // alignContent: "center",
    marginHorizontal: 30,
    marginBottom: 30,
    top: 0,
    left: 0,
    right: 0,
    bottom: 70,
  },
});
