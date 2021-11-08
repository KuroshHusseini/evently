import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const createEvent = async (
  image,
  title,
  host,
  details,
  location,
  cost,
  type,
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
    cost,
    type,
    startDateTime,
    endDateTime,
    attending: [],
    userID: currentUser.uid,
  });
  console.log("Event added!");
};

export const getEvents = async () => {
  
  
  const snapshot = await firebase
    .firestore()
    .collection("events")
    .orderBy("startDateTime")
    .get();

  snapshot.forEach((doc) => console.log(doc.data()));
};
