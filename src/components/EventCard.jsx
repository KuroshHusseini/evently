import React from "react";
import { Card, Subheading, Caption } from "react-native-paper";
import { View, StyleSheet, ImageBackground } from "react-native";
import { theme } from "../theme";
const EventCard = ({ event }) => {
  return (
    <View style={styles.cardContainer}>
      <Card style={styles.card}>
        <ImageBackground
          style={styles.cardCover}
          source={{ uri: event?.image }}
          resizeMode="cover"
        >
          <View style={styles.cardInsideContainer}>
            <Card.Content>
              <View style={styles.cardTitle}>
                <View style={styles.cardTitleWrapper}>
                  <Subheading testID="eventTitleText">
                    {event?.title}
                  </Subheading>
                </View>
                <View>
                  <Caption
                    testID="eventDateText"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    {event?.startDateTime}
                  </Caption>
                </View>
              </View>
              <View style={styles.cardDetailsWrapper}>
                <Caption
                  testID="eventDetailText"
                  style={{ color: theme.colors.text.secondary }}
                >
                  {event?.details}
                </Caption>
              </View>
              <View style={styles.loWrapper}>
                <View style={styles.innerLoWrapperLeft}>
                  <Caption
                    testID="eventLocationText"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    {event?.location}
                  </Caption>
                </View>
                <View style={styles.innerLoWrapperRight}>
                  <Caption testID="eventHostText">{event?.host}</Caption>
                </View>
              </View>
            </Card.Content>
          </View>
        </ImageBackground>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: theme.space[0],
    shadowColor: theme.colors.main.secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    borderRadius: theme.radius[0],
    overflow: "hidden",
  },
  cardCover: {
    height: 280,
    width: "100%",
  },
  cardInsideContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    borderRadius: theme.radius[0],
    backgroundColor: "rgba(255,255,255, 0.7)",
  },
  cardTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitleWrapper: {
    maxWidth: 180,
    paddingRight: theme.space[0],
  },
  loWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerLoWrapperLeft: {
    marginRight: theme.space[1],
  },
  innerLoWrapperRight: {
    marginLeft: theme.space[0],
  },
});

export default EventCard;
