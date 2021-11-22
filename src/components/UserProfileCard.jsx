import React from "react";
import { StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { theme } from "./../theme/index";
const UserProfileCard = ({ firstName, lastName, email, number }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>Personal Information</Title>
        <Paragraph>First name: {firstName}</Paragraph>
        <Paragraph>Last name: {lastName}</Paragraph>
        <Paragraph>Email: {email}</Paragraph>
        <Paragraph>Number:{number}</Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: theme.space[2],
  },
});

export default UserProfileCard;
