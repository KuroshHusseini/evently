import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import EventList from "../components/EventList";

import { EventContext } from "./../context/EventContext";
import { AuthenticationContext } from "./../context/AuthenticationContext";

const CartScreen = ({ navigation }) => {
  const { event, loading } = useContext(EventContext);
  const { user } = useContext(AuthenticationContext);

  const values = ["All", "Party", "Campus"];
  const [selected, setSelected] = useState(values[0]);

  const onSegmentChange = (event) => setSelected(event.nativeEvent.value);
  const filterEvent = event
    .map((values) => values)
    .filter((value) =>
      selected === "All" ? value : value?.type.includes(selected)
    );

  //* search
  const [search, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

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
        event={searchEvent}
        value={search}
        navigation={navigation}
        onChangeSearch={onChangeSearch}
        segmentValue={values}
        segmentSelected={selected}
        onSegmentChange={onSegmentChange}
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
