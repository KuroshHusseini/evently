import React, { useState, useEffect } from "react";
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";

import EventForm from "../components/EventForm";
import { updateEvent } from "../services/eventServices";
const EditEventModal = ({ route, navigation }) => {
  const { event, screen } = route.params;

  const [image, setImage] = useState(event.image);
  //* string data
  const [title, setTitle] = useState(event.title);
  const [host, setHost] = useState(event.host);
  const [details, setDetails] = useState(event.details);
  const [location, setLocation] = useState(event.location);
  const [cost, setCost] = useState(event.cost);
  //* event type
  const values = ["Campus", "Party", "Other"];
  const [type, setType] = useState(event.type);
  //* start time picker
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [startDateTime, setStartDateTime] = useState(event.startDateTime);
  //* end time picker
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);
  const [endDateTime, setEndDateTime] = useState(event.endDateTime);

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
      aspect: [4, 3],
      quality: 1,
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

  //* save
  const onSaveHandler = () => {
    const eventObj = {
      image,
      title,
      host,
      details,
      location,
      type,
      cost,
      startDateTime,
      endDateTime,
    };
    updateEvent(event.key, eventObj);
    navigation.navigate(screen);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
        btnTitle="save"
        onSaveHandler={onSaveHandler}
      />
    </TouchableWithoutFeedback>
  );
};

export default EditEventModal;
