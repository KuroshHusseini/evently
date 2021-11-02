/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";

import Navigator from "./src/navigation/Navigator";
import { EventContext } from "./src/utils/EvenContext";
import { events } from "./DummyData";

export default function App() {
  const [event, setEvent] = useState(events);

  return (
    <View style={styles.container}>
      <EventContext.Provider value={event}>
        <Navigator />
      </EventContext.Provider>
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
