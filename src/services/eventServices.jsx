/* eslint-disable no-undef */
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

//TODO: store the image and then download the image. Then save the downloaded image uri to firestore

const urlToBlob = async (url) => {
  return await new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onerror = reject;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      }
    };
    xhr.open("GET", url);
    xhr.responseType = "blob"; // convert type
    xhr.send();
  });
};

const uploadImageAsync = async (imageUri) => {
  let blob;
  const imageRef = imageUri.substring(imageUri.lastIndexOf("/"));

  try {
    blob = await urlToBlob(imageUri);
    const ref = await firebase.storage().ref().child(imageRef);
    await ref.put(blob);
    return await ref.getDownloadURL();
  } catch (error) {
    console.log(
      "🚀 ~ file: eventServices.jsx ~ line 33 ~ createEvent ~ error",
      error
    );
  } finally {
    blob.close();
    console.log("blob closed");
  }
};

export const createEvent = async (eventObj) => {
  // const imageUri = eventObj.image;
  // const imageURI = uploadImageAsync(imageUri);
  // console.log(imageURI);
  try {
    await firebase.firestore().collection("events").add(eventObj);
    console.log("Event added!");
  } catch (error) {
    console.log(
      "🚀 ~ file: eventServices.jsx ~ line 62 ~ createEvent ~ error",
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
