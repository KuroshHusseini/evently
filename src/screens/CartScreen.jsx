import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import EventList from "../components/EventList";

import { EventContext } from "./../context/EventContext";
import { AuthenticationContext } from "./../context/AuthenticationContext";

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

  return loading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <EventList
        screen="Cart"
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

export default CartScreen;
