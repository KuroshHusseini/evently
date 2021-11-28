import React from "react";

import {
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  View,
  StyleSheet,
} from "react-native";
import { theme } from "./../theme/index";

import UploadImage from "./UploadImage";
import CustomTextInput from "./CustomTextInput";
import DateTimePicker from "./DateTimePicker";
import CustomButton from "./CustomButton";
import CreateEventSegment from "./CreateEventSegment";

const EventForm = (props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
            keyboardType="numeric"
            keyboardAppearance="dark"
            underlineColor={theme.colors.main.secondary}
          />

          <CreateEventSegment
            title="other"
            onChosenEvent={props.onChosenEvent}
            onChangeAllHandler={props.onChangeAllHandler}
            onPartyChangeHandler={props.onPartyChangeHandler}
            onSportChangeHandler={props.onSportChangeHandler}
            onCampusChangeHandler={props.onCampusChangeHandler}
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
    </TouchableWithoutFeedback>
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
  buttonContainer: {
    justifyContent: "center",
  },
  dateTimeButtons: {
    marginTop: theme.space[0],
  },
});

export default EventForm;
