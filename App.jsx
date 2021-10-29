/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";

import Navigator from "./src/navigation/Navigator";
import { events } from "./DummyData";

export default function App() {
  const [event, setEvent] = useState(events);

  return (
    <View style={styles.container}>
      <Navigator  />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
