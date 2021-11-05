import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "./../theme/index";

import EventList from "../components/EventList";
import { EventContext } from "./../context/EvenContext";

const HomeScreen = ({ navigation }) => {
  const event = useContext(EventContext);
  //* filter
  const values = ["All", "Party", "Campus"];
  const [selected, setSelected] = useState("");

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
    .filter((value) => value?.title.includes(search));

  return (
    <View style={styles.container}>
      <EventList
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
  segmentStyle: {
    height: 40,
    marginBottom: theme.space[0],
  },
});

export default HomeScreen;
