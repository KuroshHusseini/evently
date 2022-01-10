/* eslint-disable no-undef */
import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import CustomLoader from "../components/CustomLoader";
import EventList from "../components/EventList";
import { EventContext } from "./../context/EventContext";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { UserContext } from "./../context/UserContext";

const HomeScreen = ({ navigation }) => {
  const { validEvents, loading } = useContext(EventContext);
  const { user } = useContext(AuthenticationContext);
  const { getUser } = useContext(UserContext);
  const [search, setSearchQuery] = useState("");
  const [selected, setSelected] = useState("");

  getUser(user.uid);

  const filterEvent = validEvents()
    .map((e) => e)
    .filter((e) => e.validated)
    .filter((e) => (selected === "All" ? e : e?.type.includes(selected)));

  const searchEvent = filterEvent
    .map((events) => events)
    .filter((events) => events?.title.includes(search));

  return (
    <>
      {loading ? (
        <View style={styles.loader}>
          <CustomLoader />
        </View>
      ) : (
        <>
          <EventList
            screen="Home"
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

export default HomeScreen;
