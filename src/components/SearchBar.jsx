import React from "react";
import { View, StyleSheet } from "react-native";

import { Searchbar } from "react-native-paper";
import CustomSegmentControl from "./CustomSegmentControl";

const SearchBar = (props) => {
  return (
    <View style={styles.searchBarContainer}>
      <CustomSegmentControl
        title={props.title}
        onChosenEvent={props.onChosenEvent}
        onChangeAllHandler={props.onChangeAllHandler}
        onPartyChangeHandler={props.onPartyChangeHandler}
        onSportChangeHandler={props.onSportChangeHandler}
        onPrivateChangeHandler={props.onPrivateChangeHandler}
        onCampusChangeHandler={props.onCampusChangeHandler}
      />
      <Searchbar
        style={styles.searchBarContainer}
        placeholder="Search by event name"
        onChangeText={props.onChangeSearch}
        value={props.searchQuery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    marginHorizontal: 3,
  },
});

export default SearchBar;
