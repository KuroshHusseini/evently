/* eslint-disable no-undef */
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

//TODO: store the image and then download the image. Then save the downloaded image uri to firestore

export const createEvent = async (eventObj) => {
  const imageUri = eventObj.image;
  const imageRef = imageUri.substring(imageUri.lastIndexOf("/"));

  try {
    const blob = await fetch(imageUri);

    const ref = firebase.storage().ref().child(imageRef);
    const snapshot = ref.put(blob);
    await snapshot;

    const downloadUrl = await ref.getDownloadURL();
    await firebase
      .firestore()
      .collection("events")
      .add({ ...eventObj, image: downloadUrl });

    blob.close();
    console.log("Event added!");
  } catch (error) {
    console.log(
      "🚀 ~ file: eventServices.jsx ~ line 15 ~ createEvent ~ error",
      error
    );
  }
};

export const updateEvent = async (key, eventObj) => {
  try {
    await firebase.firestore().collection("events").doc(key).update(eventObj);
  } catch (error) {
    console.log(
      "🚀 ~ file: eventServices.jsx ~ line 97 ~ updateEvent ~ error",
      error
    );
  }
};

export const deleteEvent = async (event) => {
  try {
    await firebase.firestore().collection("events").doc(event).delete();
    console.log("delete comeplete!");
  } catch (error) {
    console.log(
      "🚀 ~ file: eventServices.jsx ~ line 40 ~ deleteEvent ~ error",
      error
    );
  }
};
export const attendEvent = async (key, attendantID) => {
  try {
    const event = firebase.firestore().collection("events").doc(key);
    await event.update({
      attending: firebase.firestore.FieldValue.arrayUnion(attendantID),
    });
    console.log("added attending users id to the list");
  } catch (error) {
    console.log(
      "🚀 ~ file: eventServices.jsx ~ line 53 ~ attendEvent ~ error",
      error
    );
  }
};
export const cancelAttendEvent = async (key, attendantID) => {
  try {
    const event = firebase.firestore().collection("events").doc(key);
    await event.update({
      attending: firebase.firestore.FieldValue.arrayRemove(attendantID),
    });
    console.log("removed attending users id from the list");
  } catch (error) {
    console.log(
      "🚀 ~ file: eventServices.jsx ~ line 53 ~ attendEvent ~ error",
      error
    );
  }
};
