import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { theme } from "./../theme/index";
const CreateEventSegment = (props) => {
  return (
    <ScrollView horizontal style={styles.scContainer}>
      <View style={styles.container}>
        <Button
          style={styles.btn}
          mode={props.onChosenEvent === "Party" ? "contained" : "outlined"}
          color={theme.colors.main.secondary}
          onPress={props.onPartyChangeHandler}
          dark={true}
        >
          Party
        </Button>
        <Button
          style={styles.btn}
          mode={props.onChosenEvent === "Sport" ? "contained" : "outlined"}
          color={theme.colors.main.secondary}
          onPress={props.onSportChangeHandler}
          dark={true}
        >
          Sport
        </Button>
        <Button
          style={styles.btn}
          mode={props.onChosenEvent === "Campus" ? "contained" : "outlined"}
          color={theme.colors.main.secondary}
          onPress={props.onCampusChangeHandler}
          dark={true}
        >
          Campus
        </Button>
        <Button
          style={styles.btn}
          mode={props.onChosenEvent === "Other" ? "contained" : "outlined"}
          color={theme.colors.main.secondary}
          onPress={props.onChangeAllHandler}
          dark={true}
        >
          Other
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scContainer: {
    padding: theme.space[0],
    marginHorizontal: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  btn: {
    marginRight: theme.space[1],
  },
});

export default CreateEventSegment;
