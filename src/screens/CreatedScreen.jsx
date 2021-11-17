import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import EventList from "../components/EventList";

import { AuthenticationContext } from "../context/AuthenticationContext";
import { EventContext } from "./../context/EventContext";

const CreatedScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const { event, loading } = useContext(EventContext);
  const [selected, setSelected] = useState("");
  const [search, setSearchQuery] = useState("");

  const filterEvent = event
    .map((values) => values)
    .filter((value) =>
      selected === "All" ? value : value?.type.includes(selected)
    );

  const searchEvent = filterEvent
    .map((values) => values)
    .filter(
      (value) => user.uid === value.userID && value.title.includes(search)
    );

  return loading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <EventList
        screen="Created"
        title="All"
        value={search}
        event={searchEvent}
        navigation={navigation}
        onChangeSearch={(query) => setSearchQuery(query)}
        onChangeAllHandler={() => setSelected("All")}
        onPartyChangeHandler={() => setSelected("Party")}
        onSportChangeHandler={() => setSelected("Sport")}
        onCampusChangeHandler={() => setSelected("Campus")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CreatedScreen;
