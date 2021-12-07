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
                  <Subheading>{event?.title}</Subheading>
                </View>
                <View>
                  <Subheading>{event?.startDateTime}</Subheading>
                </View>
              </View>
              <View style={styles.cardDetailsWrapper}>
                <Caption style={{color: theme.colors.text.secondary}}>{event?.details}</Caption>
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
    borderRadius: theme.radius[2],
    overflow: "hidden",
  },
  cardCover: {
    height: 230,
    width: "100%",
  },
  cardInsideContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    borderRadius: theme.radius[1],
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
});

export default EventCard;
