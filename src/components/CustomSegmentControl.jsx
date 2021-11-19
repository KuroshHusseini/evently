import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { theme } from "./../theme/index";

const CustomSegmentControl = (props) => {
  return (
    <ScrollView horizontal style={styles.scContainer}>
      <View style={styles.container}>
        <Button
          style={styles.btn}
          mode="outlined"
          color={theme.colors.main.secondary}
          onPress={props.onChangeAllHandler}
          dark={true}
        >
          {props.title}
        </Button>
        <Button
          style={styles.btn}
          mode="outlined"
          color={theme.colors.main.secondary}
          onPress={props.onPartyChangeHandler}
          dark={true}
        >
          Party
        </Button>
        <Button
          style={styles.btn}
          mode="outlined"
          color={theme.colors.main.secondary}
          onPress={props.onSportChangeHandler}
          dark={true}
        >
          Sport
        </Button>
        <Button
          style={styles.btn}
          mode="outlined"
          color={theme.colors.main.secondary}
          onPress={props.onCampusChangeHandler}
          dark={true}
        >
          Campus
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scContainer: {
    marginBottom: theme.space[0],
    marginHorizontal: 3,
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

export default CustomSegmentControl;