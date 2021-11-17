import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "./../theme/index";

import EventList from "../components/EventList";
import { EventContext } from "./../context/EventContext";
import { ActivityIndicator } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const { event, loading } = useContext(EventContext);
  const [selected, setSelected] = useState("");

  const filterEvent = event
    .map((values) => values)
    .filter((value) =>
      selected === "All" ? value : value?.type.includes(selected)
    );
  //* search
  const [search, setSearchQuery] = useState("");
  const searchEvent = filterEvent
    .map((values) => values)
    .filter((value) => value?.title.includes(search));

  return loading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <EventList
        screen="Home"
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
  segmentStyle: {
    height: 40,
    marginBottom: theme.space[0],
  },
});

export default HomeScreen;
