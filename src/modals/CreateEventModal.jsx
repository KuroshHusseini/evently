import React, { useState, useEffect, useContext } from "react";
import { Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import moment from "moment";
import { useValidation } from "react-native-form-validator";
import CustomLoader from "./../components/CustomLoader";
import EventForm from "../components/EventForm";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { UserContext } from "./../context/UserContext";
import { EventContext } from "./../context/EventContext";

const CreateEventModal = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const { userInfo } = useContext(UserContext);
  const { create, loading } = useContext(EventContext);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("Title");
  const [host, setHost] = useState("host");
  const [details, setDetails] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia"
  );
  const [location, setLocation] = useState("Nicosia");
  const [cost, setCost] = useState("12");
  const [selected, setSelected] = useState("");
  const [code, setCode] = useState("");
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [startDateTime, setStartDateTime] = useState(null);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);
  const [endDateTime, setEndDateTime] = useState(null);

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

  const handleStartDateTimeConfirm = (startDate) => {
    setStartDateTime(moment(startDate).format("LL HH:mm").toString());
    setStartPickerVisible(false);
  };

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
      title: { minlength: 3, maxLength: 30, required: true },
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
      const eventObj = {
        image,
        title,
        host,
        details,
        location,
        cost,
        type: selected,
        privateCode: code,
        startDateTime,
        endDateTime,
        attending: [],
        creatorNumber: userInfo.phoneNumber,
        validated: false,
        userID: user.uid,
      };
      create(eventObj);
      navigation.navigate("Home");
    }
  };

  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
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
          onChosenEvent={selected}
          onChangeAllHandler={() => setSelected("Other")}
          onPartyChangeHandler={() => setSelected("Party")}
          onSportChangeHandler={() => setSelected("Sport")}
          onCampusChangeHandler={() => setSelected("Campus")}
          onPrivateChangeHandler={() => setSelected("Private")}
          code={code}
          onChangeCode={(pc) => setCode(pc)}
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
          btnTitle="create"
          onSaveHandler={onSaveHandler}
        />
      )}
    </>
  );
};

export default CreateEventModal;
