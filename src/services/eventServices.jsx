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
