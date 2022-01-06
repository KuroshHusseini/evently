import React, { useState, useEffect } from "react";
import { Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { useValidation } from "react-native-form-validator";
import moment from "moment";

import EventForm from "../components/EventForm";
import { updateEvent } from "../services/eventServices";
const EditEventModal = ({ route, navigation }) => {
  const { event, screen } = route.params;
  const [image, setImage] = useState(event.image);
  const [title, setTitle] = useState(event.title);
  const [host, setHost] = useState(event.host);
  const [details, setDetails] = useState(event.details);
  const [location, setLocation] = useState(event.location);
  const [cost, setCost] = useState(event.cost);
  const [selected, setSelected] = useState(event.type);
  const [code, setCode] = useState(event.privateCode);
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [startDateTime, setStartDateTime] = useState(event.startDateTime);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);
  const [endDateTime, setEndDateTime] = useState(event.endDateTime);

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
      aspect: [4, 3],
      quality: 1,
    });
    !result.cancelled && setImage(result.uri);
  };
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
      type: selected,
      cost,
      startDateTime,
      endDateTime,
    },
  });

  const onSaveHandler = () => {
    validate({
      image: { required: true },
      title: {
        minlength: 3,
        maxLength: 50,
        required: true,
      },
      host: { minlength: 3, maxLength: 40, required: true },
      details: { minlength: 20, maxLength: 200, required: true },
      location: { minlength: 10, maxLength: 60, required: true },
      cost: { numbers: true, required: true },
      startDateTime: { required: true },
      endDateTime: { required: true },
    });

    if (image === null) {
      Alert.alert("Error", "Image of the event must be provided");
    } else if (isFieldInError("title")) {
      Alert.alert(
        "Error",
        "Title of the event must be provided(Max length 40)! Should not include numbers and special characters"
      );
    } else if (isFieldInError("host")) {
      Alert.alert("Error", "Host of the event must be provided(Max length 40)");
    } else if (isFieldInError("details")) {
      Alert.alert(
        "Error",
        "Details must be provided with minimum length of 20 and maximum length of 200)"
      );
    } else if (isFieldInError("location") || location.length < 3) {
      Alert.alert("Error", "Location of the event must be provided");
    } else if (isFieldInError("cost")) {
      Alert.alert(
        "Error",
        "Cost of the participation in the event must be provided"
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
      const eventObj = {
        image,
        title,
        host,
        details,
        location,
        cost,
        type: selected,
        privateCode: code,
        validated: false,
        startDateTime,
        endDateTime,
      };
      updateEvent(event.key, eventObj);
      navigation.navigate(screen);
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
        onChosenEvent={selected}
        onChangeAllHandler={() => setSelected("Other")}
        onPartyChangeHandler={() => setSelected("Party")}
        onSportChangeHandler={() => setSelected("Sport")}
        onCampusChangeHandler={() => setSelected("Campus")}
        onPrivateChangeHandler={() => setSelected("Private")}
        code={code}
        onChangeCode={(pc) => setCode(pc)}
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
        btnTitle="save"
        onSaveHandler={onSaveHandler}
      />
    </>
  );
};

export default EditEventModal;
