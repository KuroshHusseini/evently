import React from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "./../theme/index";

const UploadImage = ({ image, addImage }) => {
  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
          <Text>{image ? "Edit" : "Upload"} Image</Text>
          <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    elevation: 2,
    height: "30%",
    width: "90%",
    backgroundColor: theme.colors.main.primary,
    borderRadius:  theme.radius[0],
    overflow: "hidden",
  },
  uploadBtnContainer: {
    position: "absolute",
    opacity: 0.7,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "30%",
    backgroundColor: theme.colors.main.grey,
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.space[1],
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
export default UploadImage;
