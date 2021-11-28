import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "./../theme/index";

import EventList from "../components/EventList";
import { EventContext } from "./../context/EventContext";
import { ActivityIndicator } from "react-native-paper";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { UserContext } from "./../context/UserContext";

const HomeScreen = ({ navigation }) => {
  const { event, loading } = useContext(EventContext);
  const { user } = useContext(AuthenticationContext);
  const { getUser } = useContext(UserContext);

  const [selected, setSelected] = useState("");

  getUser(user.uid);

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

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={theme.colors.main.secondary} />
        </View>
      ) : (
        <>
          <EventList
            screen="Home"
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
  segmentStyle: {
    height: 40,
    marginBottom: theme.space[0],
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
