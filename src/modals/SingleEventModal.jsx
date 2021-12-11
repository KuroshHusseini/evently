import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { UserContext } from "./../context/UserContext";
import { theme } from "./../theme/index";

import { AuthenticationContext } from "./../context/AuthenticationContext";
import CustomButton from "./../components/CustomButton";
import {
  attendEvent,
  cancelAttendEvent,
  deleteEvent,
} from "../services/eventServices";
const SingleEventModal = ({ route, navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const { userInfo } = useContext(UserContext);
  const { event, screen } = route.params;

  const attendingUser = event.attending.includes(user.uid);
  const onEditHandler = () => {
    navigation.navigate("Edit", { user: userInfo, event, screen });
  };

  const onCancelAttendanceHandler = () => {
    cancelAttendEvent(event.key, user.uid);
    navigation.navigate(screen);
  };

  const onDeleteHandler = () => {
    deleteEvent(event.key, user.uid);
    navigation.navigate(screen);
  };

  const onAttendHandler = () => {
    attendEvent(event.key, user.uid);
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <View>
          <Card.Cover style={styles.coverStyle} source={{ uri: event.image }} />
        </View>
        <View style={styles.contentStyle}>
          <Card.Content>
            <Title>{event.title}</Title>
            <Paragraph>{event.details}</Paragraph>
            <View style={styles.innerContentStyle}>
              <Title>Event Information</Title>
              <View style={styles.contentText}>
                <Title>Start: </Title>
                <Paragraph>{event.startDateTime}</Paragraph>
              </View>
              <View style={styles.contentText}>
                <Title>End: </Title>
                <Paragraph>{event.endDateTime}</Paragraph>
              </View>
              <View style={styles.contentText}>
                <Title>Host: </Title>
                <Paragraph>{event.host}</Paragraph>
              </View>
              <View style={styles.contentText}>
                <Title>Location: </Title>
                <Paragraph>{event.location}</Paragraph>
              </View>
              <View style={styles.contentText}>
                <Title>Ticket: </Title>
                <Paragraph>
                  {event.cost.charAt(0).includes("0") || event.cost.length === 0
                    ? "Free Entrance"
                    : ` ${event.cost} €`}
                </Paragraph>
              </View>
              <View style={styles.contentText}>
                <Title>Attendants Count: </Title>
                <Paragraph>
                  {event.attending.length === 0 && event.userID !== user.uid
                    ? "Be The First Attendant"
                    : event.attending.length}
                </Paragraph>
              </View>
            </View>
          </Card.Content>
        </View>
      </Card>

      {event.userID === user.uid ? (
        <View style={styles.EDButtonStyle}>
          <View style={styles.innerBtnStyle}>
            <CustomButton title="edit" onPressHandler={onEditHandler} />
          </View>
          <View style={styles.innerBtnStyle}>
            <CustomButton title="delete" onPressHandler={onDeleteHandler} />
          </View>
        </View>
      ) : (
        <View style={styles.buttonStyle}>
          {attendingUser ? (
            <CustomButton
              title="cancel attendance"
              onPressHandler={onCancelAttendanceHandler}
            />
          ) : (
            <CustomButton title="Attend" onPressHandler={onAttendHandler} />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: theme.space[1],
    margin: theme.space[1],
    borderRadius: theme.radius[2],
  },
  coverStyle: {
    borderRadius: theme.radius[2],
  },
  contentStyle: {
    backgroundColor: theme.colors.main.primary,
    marginBottom: theme.space[0],
    marginTop: theme.space[1],
  },
  buttonStyle: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: theme.space[1],
    marginBottom: theme.space[4],
  },
  innerContentStyle: {
    marginTop: theme.space[1],
  },
  contentText: {
    alignItems: "center",
    flexDirection: "row",
  },
  EDButtonStyle: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: theme.space[1],
    marginBottom: theme.space[0],
  },
  innerBtnStyle: {
    marginTop: 5,
  },
});

export default SingleEventModal;
