import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

export const createEvent = async (eventObj) => {
  const imageRef = eventObj.image.uri.substring(
    eventObj.image.uri.lastIndexOf("/")
  );

  try {
    const response = await fetch(eventObj.image.uri);
    const blob = await response.blob();
    firebase
      .storage()
      .ref()
      .child("images/" + imageRef)
      .put(blob);

    await firebase.firestore().collection("events").add(eventObj);
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
    console.log("update comeplete!");
  } catch (error) {
    console.log(
      "🚀 ~ file: eventServices.jsx ~ line 28 ~ update ~ error",
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
