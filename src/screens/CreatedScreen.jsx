import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { theme } from "./../theme/index";

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

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={theme.colors.main.secondary} />
        </View>
      ) : (
        <>
          <EventList
            screen="Created"
            title="All"
            value={search}
            event={searchEvent}
            navigation={navigation}
            onChangeSearch={(query) => setSearchQuery(query)}
            onChosenEvent={selected}
            onChangeAllHandler={() => setSelected("All")}
            onPartyChangeHandler={() => setSelected("Party")}
            onSportChangeHandler={() => setSelected("Sport")}
            onCampusChangeHandler={() => setSelected("Campus")}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreatedScreen;
