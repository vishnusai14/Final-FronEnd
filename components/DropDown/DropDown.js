import React, { useState } from "react";

import { View, Text, StyleSheet } from "react-native";

import DropDownPicker from "react-native-dropdown-picker";

export default function DropDown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: "Kavartti", value: "kavaratti" },
    { label: "Agatti", value: "agatti" },
    { label: "Minicoy", value: "minicoy" },
  ]);

  return (
    <>
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
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          theme="DARK"
          multiple={false}
          dropDownDirection="TOP"
        />
      </View>
      <View
        style={{
          backgroundColor: "#2b2e3d",
          width: 360,
          height: 47,
          borderRadius: 5,
          top: 60,
          left: 18,
        }}
      >
        {/* <Text style={styles.text}>{"Demand"}</Text> */}
      </View>
    </>
  );
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
