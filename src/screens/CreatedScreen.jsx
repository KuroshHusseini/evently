import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import EventList from "../components/EventList";


const CreatedScreen = ({event}) => {
console.log("🚀 ~ file: CreatedScreen.jsx ~ line 8 ~ CreatedScreen ~ event", event)
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

export default CreatedScreen;
