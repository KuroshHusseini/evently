import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import EventList from "../components/EventList";
import { events } from "./../../DummyData";

const CreatedScreen = () => {
  const values = ["All", "Party", "Campus"];
  const [selected, setSelected] = useState(values[0]);
  const onSegmentChange = (event) => setSelected(event.nativeEvent.value);
  const filterEvent = events
    .map((values) => values)
    .filter((value) =>
      selected === "All" ? value : value?.type.includes(selected)
    );
  //* search
  const [search, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  const searchEvent = filterEvent
    .map((values) => values)
    .filter((value) => value.title.includes(search));

  return (
    <View style={styles.container}>
      <EventList
        event={searchEvent}
        value={search}
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

export default CreatedScreen;
