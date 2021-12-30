import React, { useContext, useState } from "react";
import {
  Alert,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  View,
  Platform,
} from "react-native";
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
  const [competent, setCompetent] = useState(false);
  
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

  const onPrivateCodeHandler = () => {
    Alert.prompt(
      "Private Code",
      "Please enter the private code that was provided to you by the event creator",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Enter",
          onPress: (providedCode) => {
            if (providedCode !== event.privateCode) {
              Alert.alert(
                "Incorrect Code",
                "Please enter the correct code that was provided to you by the event creator"
              );
            } else {
              setCompetent(!competent);
            }
          },
        },
      ],
      "secure-text",
      null,
      "dark"
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Card style={styles.card}>
          <View>
            <Card.Cover
              style={styles.coverStyle}
              source={{ uri: event.image }}
            />
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
                    {event.cost.charAt(0).includes("0") ||
                    event.cost.length === 0
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
            ) : event.type === "Private" ? (
              competent ? (
                <CustomButton title="Attend" onPressHandler={onAttendHandler} />
              ) : (
                <CustomButton
                  title="Press to enter private code"
                  onPressHandler={onPrivateCodeHandler}
                />
              )
            ) : (
              <CustomButton title="Attend" onPressHandler={onAttendHandler} />
            )}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
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
  innerContentStyle: {
    marginTop: theme.space[1],
  },
  contentText: {
    alignItems: "center",
    flexDirection: "row",
  },
  pcStyle: {
    marginHorizontal: theme.space[1],
  },
  EDButtonStyle: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: theme.space[1],
    marginBottom: theme.space[0],
  },
  innerBtnStyle: {
    flex: 1,
    margin: theme.space[0],
  },
});

export default SingleEventModal;
