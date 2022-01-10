/* eslint-disable no-undef */
import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";

import EventList from "../components/EventList";

import { EventContext } from "./../context/EventContext";
import { AuthenticationContext } from "./../context/AuthenticationContext";

import CustomLoader from "./../components/CustomLoader";

const CartScreen = ({ navigation }) => {
  const { validEvents, loading } = useContext(EventContext);
  const { user } = useContext(AuthenticationContext);
  const [search, setSearchQuery] = useState("");
  const [selected, setSelected] = useState("");

  const filterEvent = validEvents()
    .map((values) => values)
    .filter((value) =>
      selected === "All" ? value : value?.type.includes(selected)
    );

  const searchEvent = filterEvent
    .map((values) => values)
    .filter(
      (value) =>
        value.attending.includes(user.uid) && value.title.includes(search)
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
            screen="Cart"
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

export default CartScreen;
