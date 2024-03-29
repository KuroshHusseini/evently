/* eslint-disable no-undef */
import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";

import EventList from "../components/EventList";
import CustomLoader from "./../components/CustomLoader";

import { AuthenticationContext } from "../context/AuthenticationContext";
import { EventContext } from "./../context/EventContext";

const CreatedScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const { event, loading } = useContext(EventContext);
  const [selected, setSelected] = useState("");
  const [search, setSearchQuery] = useState("");

  const filterEvent = event
    .map((values) => values)
    .filter((value) =>
      selected === "All" ? value : value?.type.includes(selected)
    );

  //search event and show the users created ones
  const searchEvent = filterEvent
    .map((values) => values)
    .filter(
      (value) => user.uid === value.userID && value.title.includes(search)
    );

  return (
    <>
      {loading ? (
        <View style={styles.loader}>
          <CustomLoader />
        </View>
      ) : (
        <>
          <EventList
            screen="Created"
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreatedScreen;
