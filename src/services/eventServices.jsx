import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const createEvent = async (
  image,
  title,
  host,
  details,
  location,
  type,
  cost,
  startDateTime,
  endDateTime
) => {
  const currentUser = await firebase.auth().currentUser;
  await firebase.firestore().collection("events").add({
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
    userID: currentUser.uid,
  });
  console.log("Event added!");
};

export const deleteEvent = async (key) => {
  try {
    await firebase.firestore().collection("events").doc(key).delete();
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
