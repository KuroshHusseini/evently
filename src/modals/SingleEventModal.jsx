import React, { useContext, useState } from "react";
import { Alert, StyleSheet, View, Image, ScrollView } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Card, Title, Paragraph } from "react-native-paper";
import { theme } from "./../theme/index";
import * as Linking from "expo-linking";
import { UserContext } from "./../context/UserContext";

import { AuthenticationContext } from "./../context/AuthenticationContext";
import CustomButton from "./../components/CustomButton";
import {
  attendEvent,
  cancelAttendEvent,
  deleteEvent,
  updateEvent,
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
    Alert.alert(
      "Cancel attendant!",
      "Are you sure you want to skip this event?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            cancelAttendEvent(event.key, user.uid);
            navigation.navigate(screen);
          },
        },
      ]
    );
  };

  const onDeleteHandler = () => {
    Alert.alert(
      "Delete Event!",
      "Are you sure you want to delete this event?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deleteEvent(event.key, user.uid);
            navigation.navigate(screen);
          },
        },
      ]
    );
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

  const onValidEventHandler = () => {
    updateEvent(event.key, { ...event, validated: true });
    navigation.navigate("Validate");
  };

  const onContactHandler = () => {
    Linking.openURL(`tel:+357${event.creatorNumber}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.eventImageStyle}>
          <Image source={{ uri: event?.image }} style={styles.coverStyle} />
        </View>
        <Card style={styles.card}>
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
                <View style={styles.contentText}>
                  <Title>Validated: </Title>
                  {event.validated ? (
                    <AntDesign
                      name="checksquare"
                      size={24}
                      color={theme.colors.main.green}
                    />
                  ) : (
                    <Entypo
                      name="squared-cross"
                      size={24}
                      color={theme.colors.main.red}
                    />
                  )}
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
        ) : userInfo.maintainer && !event.validated ? (
          <>
            <View style={styles.acButtonStyle}>
              <View style={styles.innerBtnStyle}>
                <CustomButton
                  title="Contact creator"
                  onPressHandler={onContactHandler}
                />
              </View>
              <View style={styles.innerBtnStyle}>
                <CustomButton title="delete" onPressHandler={onDeleteHandler} />
              </View>
            </View>
            <View style={styles.innerBtnStyle}>
              <CustomButton
                title="The event is valid"
                onPressHandler={onValidEventHandler}
              />
            </View>
          </>
        ) : userInfo.maintainer && event.validated ? (
          <>
            <View style={styles.acButtonStyle}>
              <View style={styles.innerBtnStyle}>
                <CustomButton
                  title="Contact creator"
                  onPressHandler={onContactHandler}
                />
              </View>
              <View style={styles.innerBtnStyle}>
                <CustomButton title="delete" onPressHandler={onDeleteHandler} />
              </View>
            </View>
          </>
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
                <View>
                  <View>
                    <CustomButton
                      title="Contact creator"
                      onPressHandler={onContactHandler}
                    />
                  </View>
                  <View style={styles.innerContentStyle}>
                    <CustomButton
                      title="Press to enter private code"
                      onPressHandler={onPrivateCodeHandler}
                    />
                  </View>
                </View>
              )
            ) : (
              <View style={styles.acButtonStyle}>
                <View style={styles.innerBtnStyle}>
                  <CustomButton
                    title="Contact creator"
                    onPressHandler={onContactHandler}
                  />
                </View>
                <View style={styles.innerBtnStyle}>
                  <CustomButton
                    title="Attend"
                    onPressHandler={onAttendHandler}
                  />
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventImageStyle: {
    borderRadius: theme.radius[0],
    overflow: "hidden",
    margin: theme.space[1],
  },
  card: {
    padding: theme.space[0],
    marginHorizontal: theme.space[1],
    marginVertical: theme.space[0],
    borderRadius: theme.radius[0],
    backgroundColor: theme.colors.main.primary,
    elevation: theme.space[1],
  },
  coverStyle: {
    resizeMode: "stretch",
    width: "100%",
    height: 250,
  },
  contentStyle: {
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
  acButtonStyle: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  innerBtnStyle: {
    flex: 1,
    margin: theme.space[0],
  },
});

export default SingleEventModal;
