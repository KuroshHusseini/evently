import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import EventList from "../components/EventList";
import { theme } from "./../theme/index";
import { events } from "./../../DummyData";

const CartScreen = () => {
  const [event, setEvent] = useState(events);
  const [search, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const onSearchHandler = () => console.log(search);

  return (
    <SafeAreaView style={styles.container}>
      <EventList
        event={event}
        value={search}
        onChangeSearch={onChangeSearch}
        onSearchPress={onSearchHandler}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.main.grey,
  },
});

export default CartScreen;
