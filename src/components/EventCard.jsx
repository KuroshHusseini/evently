import React from "react";
import { Card, Subheading, Caption } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { theme } from "../theme";

const EventCard = ({event}) => {
  return (
    <Card>
      <View
        style={styles.cardInsideContainer}
      >
        <Card.Cover style={styles.cardCover} source={{ uri: event?.image }} />
        <Card.Content>
          <View style={styles.cardTitle}>
            <View style={styles.cardTitleWrapper}>
              <Subheading>{event?.title}</Subheading>
            </View>
            <View>
              <Subheading>{event?.startTimeDate}</Subheading>
            </View>
          </View>
          <View>
            <Caption>{event?.details}</Caption>
          </View>
          <View style={styles.loWrapper}>
            <View>
              <Subheading>{event?.location}</Subheading>
            </View>
            <View>
              <Subheading>{event?.host}</Subheading>
            </View>
          </View>
        </Card.Content>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardInsideContainer: {
    margin: theme.space[2],
    borderRadius: theme.space[0],
  },
  cardCover: {
    borderRadius: theme.radius[0],
  },
  cardTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitleWrapper: {
    maxHeight: 40,
    paddingRight: theme.space[1],
  },
  loWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default EventCard;
