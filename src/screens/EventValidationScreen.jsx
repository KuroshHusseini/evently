import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "./../theme/index";
import CustomLoader from "../components/CustomLoader";
import EventList from "../components/EventList";
import { EventContext } from "./../context/EventContext";

const EventValidationScreen = ({ navigation }) => {
  const { event, loading } = useContext(EventContext);
  const [search, setSearchQuery] = useState("");
  const [selected, setSelected] = useState("");

  const eventsToBeValidated = event.map((e) => e).filter((e) => !e.validated);
  const filterEvent = eventsToBeValidated
    .map((values) => values)
    .filter((value) =>
      selected === "All" ? value : value?.type.includes(selected)
    );

  const searchEvent = filterEvent
    .map((values) => values)
    .filter((value) => value?.title.includes(search));

  return (
    <View style={styles.container}>
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <EventList
            screen="Validate"
            title="All"
            value={search}
            event={searchEvent}
            navigation={navigation}
            onChangeSearch={(query) => setSearchQuery(query)}
            onChosenEvent={selected}
            onChangeAllHandler={() => setSelected("All")}
            onPartyChangeHandler={() => setSelected("Party")}
            onSportChangeHandler={() => setSelected("Sport")}
            onPrivateChangeHandler={() => setSelected("Private")}
            onCampusChangeHandler={() => setSelected("Campus")}
          />
        </>
      )}
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

export default EventValidationScreen;
