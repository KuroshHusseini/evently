/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";

import Navigator from "./src/navigation/Navigator";

import { EventContext } from "./src/context/EvenContext";
import { events } from "./DummyData";
import { theme } from "./src/theme/index";

export default function App() {
  const [event, setEvent] = useState(events);

  return (
    <SafeAreaView style={styles.container}>
      <EventContext.Provider value={event}>
        <Navigator />
      </EventContext.Provider>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.main.secondary,
  },
});
