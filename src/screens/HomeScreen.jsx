import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

import EventList from "../components/EventList";

const HomeScreen = ({ event, navigation }) => {
console.log("🚀 ~ file: HomeScreen.jsx ~ line 8 ~ HomeScreen ~ navigation", navigation)
  console.log("🚀 ~ file: HomeScreen.jsx ~ line 7 ~ HomeScreen ~ event", event);
  const [search, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const onSearchHandler = () => console.log(search);

  const onCreateEventHandler = () => navigation.navigate("Create");

  return (
    <SafeAreaView style={styles.container}>
      <EventList
        event={event}
        value={search}
        onChangeSearch={onChangeSearch}
        onSearchPress={onSearchHandler}
      />
      <FAB
        style={styles.fab}
        small
        color="white"
        backgroundColor="black"
        label="Create"
        icon="plus"
        onPress={onCreateEventHandler}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
  },
});

export default HomeScreen;
