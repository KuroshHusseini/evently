import React from "react";
import { StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { theme } from "./../theme/index";
const UserProfileCard = ({ firstName, lastName, email, number }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>Personal Information</Title>
        <Paragraph testID="firstNameText">First name: {firstName}</Paragraph>
        <Paragraph testID="lastNameText">Last name: {lastName}</Paragraph>
        <Paragraph testID="emailText">Email: {email}</Paragraph>
        <Paragraph testID="numberText">Number: {number}</Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: theme.space[0],
  },
});

export default UserProfileCard;
