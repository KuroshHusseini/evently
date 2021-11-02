import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { theme } from "./../theme/index";

import EventList from "../components/EventList";
import { EventContext } from "./../utils/EvenContext";

const CartScreen = () => {
  const event = useContext(EventContext);
  const [search, setSearchQuery] = useState("");

  //* filter
  const values = ["All", "Party", "Organization"];
  const [selected, setSelected] = useState(values[0]);
  const onSegmentChange = (event) => setSelected(event.nativeEvent.value);


  //* search
  const onChangeSearch = (query) => setSearchQuery(query);
  const filterEvent = event
    .map((values) => values)
    .filter((value) => value.title.includes(search));

  return (
    <SafeAreaView style={styles.container}>
      <EventList
        event={filterEvent}
        value={search}
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
});

export default CartScreen;
