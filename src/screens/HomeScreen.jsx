import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import EventList from "../components/EventList";

const HomeScreen = ({event}) => {
console.log("🚀 ~ file: HomeScreen.jsx ~ line 7 ~ HomeScreen ~ event", event)
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
    backgroundColor: "lightgrey",
  },
});

export default HomeScreen;
