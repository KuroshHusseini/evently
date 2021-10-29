import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { theme } from "./../theme/index";

import { FAB } from "react-native-paper";

import EventList from "../components/EventList";
import { events } from "./../../DummyData";

const HomeScreen = ({ navigation }) => {
  const [event, setEvent] = useState(events);
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
    backgroundColor: theme.colors.main.grey,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.main.secondary,
  },
});

export default HomeScreen;
