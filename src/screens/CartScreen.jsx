import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import EventList from "../components/EventList";

import { EventContext } from "./../context/EventContext";
import { AuthenticationContext } from "./../context/AuthenticationContext";
import { theme } from "./../theme/index";

const CartScreen = ({ navigation }) => {
  const { event, loading } = useContext(EventContext);
  const { user } = useContext(AuthenticationContext);
  const [search, setSearchQuery] = useState("");
  const [selected, setSelected] = useState("");

  const filterEvent = event
    .map((values) => values)
    .filter((value) =>
      selected === "All" ? value : value?.type.includes(selected)
    );

  const searchEvent = filterEvent
    .map((values) => values)
    .filter(
      (value) =>
        value.attending.includes(user.uid) && value.title.includes(search)
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
            screen="Cart"
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

export default CartScreen;
