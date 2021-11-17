/* eslint-disable no-unused-vars */
import React from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../theme";

import EventCard from "./EventCard";
import SearchBar from "./SearchBar";

export const ItemSeparator = () => <View style={styles.separator} />;
const EventList = ({
  event,
  screen,
  value,
  title,
  onChangeSearch,
  onChangeAllHandler,
  onPartyChangeHandler,
  onSportChangeHandler,
  onCampusChangeHandler,
  navigation,
}) => {
  return (
    <View style={styles.flatListContainer}>
      <FlatList
        data={event}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
          <SearchBar
            searchQuery={value}
            title={title}
            onChangeSearch={onChangeSearch}
            onChangeAllHandler={onChangeAllHandler}
            onPartyChangeHandler={onPartyChangeHandler}
            onSportChangeHandler={onSportChangeHandler}
            onCampusChangeHandler={onCampusChangeHandler}
          />
        }
        renderItem={({ item, _, separators }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Detail", { event: item, screen })
            }
          >
            <EventCard
              event={item}
              keyExtractor={({ uid }) => uid}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    margin: theme.space[0],
  },
  separator: {
    height: theme.space[1],
  },
});

export default EventList;
