import React from "react";

import { Platform, KeyboardAvoidingView, View, StyleSheet } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { theme } from "./../theme/index";

import UploadImage from "./UploadImage";
import CustomTextInput from "./CustomTextInput";
import DateTimePicker from "./DateTimePicker";
import CustomButton from "./CustomButton";

const EventForm = (props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <UploadImage image={props.image} addImage={props.pickImage} />
      <View InputScrollView style={styles.inputContainer}>
        <CustomTextInput
          label="Title"
          value={props.title}
          onChangeText={props.onChangeTitle}
          keyboardAppearance="dark"
          underlineColor={theme.colors.main.secondary}
        />
        <CustomTextInput
          label="Host"
          value={props.host}
          onChangeText={props.onChangeHost}
          keyboardAppearance="dark"
          underlineColor={theme.colors.main.secondary}
        />

        <CustomTextInput
          label="Details"
          value={props.details}
          onChangeText={props.onChangeDetails}
          keyboardAppearance="dark"
          underlineColor={theme.colors.main.secondary}
        />

        <CustomTextInput
          label="Location"
          value={props.location}
          onChangeText={props.onChangeLocation}
          keyboardAppearance="dark"
          underlineColor={theme.colors.main.secondary}
        />

        <CustomTextInput
          label="Cost"
          value={props.cost}
          onChangeText={props.onChangeCost}
          keyboardAppearance="dark"
          underlineColor={theme.colors.main.secondary}
        />

        <SegmentedControl
          style={styles.segmentStyle}
          appearance="light"
          values={props.segmentControlValues}
          selectedIndex={props.segmentType}
          onChange={props.onSegmentChangeHandler}
        />

        <View style={styles.buttonContainer}>
          <View style={styles.dateTimeButtons}>
            <DateTimePicker
              title="start date and time"
              value={props.startDateTimeValue}
              isDateTimePickerVisible={props.isStartPickerVisible}
              showDateTimePicker={props.showStartDateTimePicker}
              hideDateTimePicker={props.hideStartDateTimePicker}
              handleConfirm={props.handleStartDateTimeConfirm}
            />
          </View>
          <View style={styles.dateTimeButtons}>
            <DateTimePicker
              title="end date and time"
              value={props.endDateTimeValue}
              isDateTimePickerVisible={props.isEndPickerVisible}
              showDateTimePicker={props.showEndDateTimePicker}
              hideDateTimePicker={props.hideEndDateTimePicker}
              handleConfirm={props.handleEndDateTimeConfirm}
            />
          </View>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <CustomButton
          title={props.btnTitle}
          mode="contained"
          dark={true}
          color={theme.colors.main.secondary}
          onPressHandler={props.onSaveHandler}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "90%",
    marginTop: theme.space[0],
  },
  segmentStyle: {
    height: 40,
    marginTop: theme.space[0],
  },
  buttonContainer: {
    justifyContent: "center",
  },
  dateTimeButtons: {
    marginTop: theme.space[0],
  },
});

export default EventForm;
