import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

//TODO: store the image and then download the image. Then save the downloaded image uri to firestore

// const getPictureBlob = async (uri) => {
//   const res = await fetch(uri);
//   const bob = await res.blob()
//   return;
// };

export const createEvent = async (eventObj) => {
  let blob;
  const imageUri = eventObj.image.uri;
  const imageRef = imageUri.substring(imageUri.lastIndexOf("/"));

  try {
    const res = await fetch(imageUri);
    blob = await res.blob();
    const ref = firebase
      .storage()
      .ref()
      .child("images/" + imageRef);

    const snapshot = await ref.put(blob);
    const imageFirebaseUri = await snapshot.ref.getDownloadURL();
    await firebase
      .firestore()
      .collection("events")
      .add({ ...eventObj, image: imageFirebaseUri });
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
