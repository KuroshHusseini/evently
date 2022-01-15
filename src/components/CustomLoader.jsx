/* eslint-disable no-undef */
import React from "react";
import { View, StyleSheet } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

const CustomLoader = () => {
  return (
    <View style={styles.loader}>
      <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.45)"
        source={require("../../loader")}
        animationStyle={styles.lottie}
        speed={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 300,
    height: 300,
  },
});

export default CustomLoader;
