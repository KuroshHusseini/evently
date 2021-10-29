import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { theme } from "./../theme/index";

const SearchBar = ({ onChangeSearch, searchQuery, onSearchPress }) => {
  return (
    <View style={styles.searchBarContainer}>
      <Searchbar
        style={styles.searchBarContainer}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={onSearchPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    marginBottom: theme.space[0],
  },
});

export default SearchBar;