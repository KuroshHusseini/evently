import React from "react";
import { Card, Subheading, Caption, Title } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { theme } from "../theme";

const EventCard = ({ event }) => {
  return (
    <Card>
      <View style={styles.cardInsideContainer}>
        <Card.Cover style={styles.cardCover} source={{ uri: event?.image }} />
        <Card.Content>
          <View style={styles.cardTitle}>
            <View style={styles.cardTitleRapper}>
              <Title>{event?.title}</Title>
            </View>
            <View>
              <Subheading>{event?.start_date_time}</Subheading>
            </View>
          </View>
          <View>
            <Caption>{event?.description}</Caption>
          </View>
          <View>
            <Subheading>{event?.location}</Subheading>
          </View>
        </Card.Content>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardInsideContainer: {
    margin: theme.space[0],
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
  cardTitleRapper: {
    paddingRight: theme.space[1],
  },
});

export default EventCard;
