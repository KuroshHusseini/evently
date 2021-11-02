import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { theme } from "./../theme/index";

import EventList from "../components/EventList";
import { EventContext } from "./../utils/EvenContext";

const HomeScreen = ({ navigation }) => {
  const event = useContext(EventContext);
  //* filter
  const values = ["All", "Party", "Organization"];
  const [selected, setSelected] = useState(values[0]);
  const onSegmentChange = (event) => setSelected(event.nativeEvent.value);

  //* search
  const [search, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const filterEvent = event
    .map((values) => values)
    .filter((value) => value.title.includes(search));

  return (
    <SafeAreaView style={styles.container}>
      <EventList
        event={filterEvent}
        value={search}
        navigation={navigation}
        onChangeSearch={onChangeSearch}
        segmentValue={values}
        segmentSelected={selected}
        onSegmentChange={onSegmentChange}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.main.lightGray,
  },
  segmentStyle: {
    height: 40,
    marginBottom: theme.space[0],
  },
});

export default HomeScreen;
