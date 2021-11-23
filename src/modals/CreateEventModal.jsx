import React, { useState, useEffect, useContext } from "react";
import { Platform, Alert } from "react-native";

import * as ImagePicker from "expo-image-picker";
import moment from "moment";
import { useValidation } from "react-native-form-validator";

import EventForm from "../components/EventForm";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { createEvent } from "../services/eventServices";

const CreateEventModal = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const [image, setImage] = useState(null);
  //* string data
  const [title, setTitle] = useState("");
  const [host, setHost] = useState("");
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState("");
  const [cost, setCost] = useState("");
  //* event type
  const values = ["Campus", "Party", "Other"];
  const [type, setType] = useState("Campus");
  //* start time picker
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [startDateTime, setStartDateTime] = useState(null);
  //* end time picker
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);
  const [endDateTime, setEndDateTime] = useState(null);

  //* image picker
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [2, 1],
      quality: 0,
    });
    !result.cancelled && setImage(result.uri);
  };

  //* type of event handler
  const onSegmentChangeHandler = (event) => setType(event.nativeEvent.value);

  //* start date
  const handleStartDateTimeConfirm = (startDate) => {
    setStartDateTime(moment(startDate).format("LL HH:mm").toString());
    setStartPickerVisible(false);
  };

  //* end date
  const handleEndDateTimeConfirm = (endDate) => {
    setEndDateTime(moment(endDate).format("LL HH:mm").toString());
    setEndPickerVisible(false);
  };

  const { validate, isFieldInError } = useValidation({
    state: {
      image,
      title,
      host,
      details,
      location,
      type,
      cost,
      startDateTime,
      endDateTime,
    },
  });


  const onSaveHandler = () => {
    validate({
      image: { required: true },
      title: { minlength: 3, maxLength: 40, required: true },
      host: { minlength: 3, maxLength: 40, required: true },
      details: { minlength: 20, maxLength: 200, required: true },
      location: { minlength: 3, maxLength: 60, required: true },
      cost: { numbers: true, required: true },
      startDateTime: { required: true },
      endDateTime: { required: true },
    });

    if (image === null) {
      Alert.alert("Error", "Image of the event must be provided");
    } else if (isFieldInError("title") || title.length < 3) {
      Alert.alert(
        "Error",
        "Title of the event must be provided(Max length 40)"
      );
    } else if (isFieldInError("host")) {
      Alert.alert("Error", "Host of the event must be provided(Max length 40)");
    } else if (isFieldInError("details")) {
      Alert.alert(
        "Error",
        "Details must be provided with minimum length of 20 and maximum length of 200)"
      );
    } else if (isFieldInError("location")) {
      Alert.alert("Error", "Location of the event must be provided");
    } else if (isFieldInError("cost")) {
      Alert.alert(
        "Error",
        "The cost of the participation in the event must be provided"
      );
    } else if (isFieldInError("startDateTime")) {
      Alert.alert(
        "Error",
        "The starting date and time of the event must be provided"
      );
    } else if (isFieldInError("endDateTime")) {
      Alert.alert(
        "Error",
        "The finishing date and time of the event must be provided"
      );
    } else {
      createEvent({
        image,
        title,
        host,
        details,
        location,
        type: type,
        cost,
        startDateTime,
        endDateTime,
        attending: [],
        userID: user.uid,
      });
      navigation.navigate("Home");
    }
  };

  return (
    <>
      <EventForm
        image={image}
        pickImage={pickImage}
        title={title}
        onChangeTitle={(t) => setTitle(t)}
        host={host}
        onChangeHost={(h) => setHost(h)}
        details={details}
        onChangeDetails={(d) => setDetails(d)}
        location={location}
        onChangeLocation={(l) => setLocation(l)}
        cost={cost}
        onChangeCost={(c) => setCost(c)}
        startDateTimeValue={startDateTime}
        isStartPickerVisible={isStartPickerVisible}
        showStartDateTimePicker={() => setStartPickerVisible(true)}
        hideStartDateTimePicker={() => setStartPickerVisible(false)}
        handleStartDateTimeConfirm={handleStartDateTimeConfirm}
        endDateTimeValue={endDateTime}
        isEndPickerVisible={isEndPickerVisible}
        showEndDateTimePicker={() => setEndPickerVisible(true)}
        hideEndDateTimePicker={() => setEndPickerVisible(false)}
        handleEndDateTimeConfirm={handleEndDateTimeConfirm}
        segmentControlValues={values}
        segmentType={type}
        onSegmentChangeHandler={onSegmentChangeHandler}
        btnTitle="create"
        onSaveHandler={onSaveHandler}
      />
    </>
  );
};

export default CreateEventModal;
