import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { theme } from "./../theme/index";

const CustomLoader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color={theme.colors.main.secondary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomLoader;
