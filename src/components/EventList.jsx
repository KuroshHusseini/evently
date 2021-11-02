/* eslint-disable no-unused-vars */
import React from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { theme } from "../theme";

import EventCard from "./EventCard";
import SearchBar from "./SearchBar";

export const ItemSeparator = () => <View style={styles.separator} />;
const EventList = ({
  event,
  value,
  onChangeSearch,
  segmentValue,
  segmentSelected,
  onSegmentChange,
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.flatListContainer}>
      <FlatList
        data={event}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
          <SearchBar
            searchQuery={value}
            onChangeSearch={onChangeSearch}
            segmentValue={segmentValue}
            segmentSelected={segmentSelected}
            onSegmentChange={onSegmentChange}
          />
        }
        renderItem={({ item, _, separators }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Detail", { event: item })}
          >
            <EventCard
              event={item}
              Key={({ id }) => id}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
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
