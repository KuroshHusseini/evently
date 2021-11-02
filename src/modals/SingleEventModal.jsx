import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import CustomButton from "./../components/CustomButton";
import { theme } from "./../theme/index";
const SingleEventModal = ({ route, navigation }) => {
  const { event } = route.params;

  const onAttendHandler = () => {
    console.log(event.user);
    navigation.navigate("Home");
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
            <Paragraph>{event.description}</Paragraph>
            <View style={styles.innerContentStyle}>
              <Title>Information</Title>
              <Title>Start date and time</Title>
              <Paragraph>{event.startTimeDate}</Paragraph>
              <Title>End date and time</Title>
              <Paragraph>{event.endTimeDate}</Paragraph>
              <Title>Location</Title>
              <Paragraph>{event.startTimeDate}</Paragraph>
              <Title>Ticket</Title>
              <Paragraph>{event.amount}</Paragraph>
            </View>
          </Card.Content>
        </View>
      </Card>
      <View style={styles.buttonStyle}>
        <CustomButton title="Attend" onPressHandler={onAttendHandler} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.main.lightGray,
    justifyContent: "center",
  },
  card: {
    padding: theme.space[1],
    margin: theme.space[1],
    marginTop: theme.space[1],
    borderRadius: theme.radius[0],
  },
  coverStyle: {
    borderRadius: theme.radius[0],
  },

  contentStyle: {
    backgroundColor: theme.colors.main.primary,
    borderRadius: theme.radius[0],
    paddingBottom: theme.space[2],
    marginTop: theme.space[3],
  },
  buttonStyle: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: 10,
    marginBottom: 30,
  },
});

export default SingleEventModal;
