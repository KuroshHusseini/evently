import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "./../theme/index";
import CustomLoader from "../components/CustomLoader";
import EventList from "../components/EventList";
import { EventContext } from "./../context/EventContext";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { UserContext } from "./../context/UserContext";

const HomeScreen = ({ navigation }) => {
  const {  validEvents, loading } = useContext(EventContext);
 
  const { user } = useContext(AuthenticationContext);
  const { getUser } = useContext(UserContext);
  const [search, setSearchQuery] = useState("");
  const [selected, setSelected] = useState("");

  getUser(user.uid);

  const filterEvent = validEvents()
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

export default HomeScreen;
