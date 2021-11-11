import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
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
  const { event, screen } = route.params;
  console.log(
    "🚀 ~ file: SingleEventModal.jsx ~ line 16 ~ SingleEventModal ~ screen",
    screen
  );

  const attendingUser = event.attending.includes(user.uid);

  const onEditHandler = () => {
    console.log(event);
  };

  const onCancelAttendanceHandler = () => {
    cancelAttendEvent(event.key, user.uid);
    navigation.navigate(screen);
  };

  const onDeleteHandler = () => {
    deleteEvent(event.key);
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
              <Title>Information</Title>
              <Title>Start date and time</Title>
              <Paragraph>{event.startDateTime}</Paragraph>
              <Title>End date and time</Title>
              <Paragraph>{event.endDateTime}</Paragraph>
              <Title>Host</Title>
              <Paragraph>{event.host}</Paragraph>
              <Title>Location</Title>
              <Paragraph>{event.location}</Paragraph>
              <Title>Ticket</Title>
              <Paragraph>{event.cost}</Paragraph>
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
    borderRadius: theme.radius[0],
  },
  coverStyle: {
    borderRadius: theme.radius[0],
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
