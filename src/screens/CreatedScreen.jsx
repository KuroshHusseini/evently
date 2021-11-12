import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import EventList from "../components/EventList";

import { AuthenticationContext } from "../context/AuthenticationContext";
import { EventContext } from "./../context/EventContext";

const CreatedScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const { event, loading } = useContext(EventContext);

  const values = ["All", "Party", "Campus"];
  const [selected, setSelected] = useState(values[0]);
  const [search, setSearchQuery] = useState("");

  const onSegmentChange = (event) => setSelected(event.nativeEvent.value);
  const filterEvent = event
    .map((values) => values)
    .filter((value) =>
      selected === "All" ? value : value?.type.includes(selected)
    );
    
  const searchEvent = filterEvent
    .map((values) => values)
    .filter(
      (value) => user.uid === value.userID && value.title.includes(search)
    );

  return loading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <EventList
        screen="Created"
        event={searchEvent}
        value={search}
        navigation={navigation}
        onChangeSearch={(query) => setSearchQuery(query)}
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
