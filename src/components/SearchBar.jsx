import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

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
    marginBottom: 5,
  },
});

export default SearchBar;
