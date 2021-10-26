/* eslint-disable no-unused-vars */
import React from "react";
import { FlatList, SafeAreaView, View, StyleSheet } from "react-native";

import EventCard from "./EventCard";
import SearchBar from "./SearchBar";

export const ItemSeparator = () => <View style={styles.separator} />;
const EventList = ({ event, value, onChangeSearch, onSearchPress }) => {
  return (
    <SafeAreaView style={styles.flatListContainer}>
      <FlatList
        data={event}
    
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
          <SearchBar
            searchQuery={value}
            onChangeSearch={onChangeSearch}
            onSearchPress={onSearchPress}
          />
        }
        renderItem={({ item, _, separators }) => (
          <EventCard
            event={item}
            Key={({ id }) => id}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatListContainer:{
    margin: 5
  },
  separator: {
    height: 10,
  },
});

export default EventList;
