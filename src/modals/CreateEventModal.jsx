import React, { useState, useEffect, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";
import moment from "moment";

import { createEvent } from "../services/eventServices";
import EventForm from "../components/EventForm";
import { AuthenticationContext } from "../context/AuthenticationContext";

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
  const [type, setType] = useState(values[0]);
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
    createEvent({
      image,
      title,
      host,
      details,
      location,
      type: type,
      cost: cost,
      startDateTime,
      endDateTime,
      attending: [],
      userID: user.uid,
    });
    navigation.navigate("Home");
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
        btnTitle="create"
        onSaveHandler={onSaveHandler}
      />
    </TouchableWithoutFeedback>
  );
};

export default CreateEventModal;
