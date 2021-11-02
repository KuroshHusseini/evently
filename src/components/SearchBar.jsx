import React from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "./../theme/index";

import { Searchbar } from "react-native-paper";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

const SearchBar = ({
  onChangeSearch,
  searchQuery,
  segmentValue,
  segmentSelected,
  onSegmentChange,
}) => {
  return (
    <View style={styles.searchBarContainer}>
      <SegmentedControl
        style={styles.segmentStyle}
        appearance="light"
        values={segmentValue}
        selectedIndex={segmentSelected}
        onChange={onSegmentChange}
      />
      <Searchbar
        style={styles.searchBarContainer}
        placeholder="Search by event name"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    marginBottom: theme.space[0],
  },
  segmentStyle: {
    height: 50,
    marginBottom: theme.space[0],
  },
});

export default SearchBar;
