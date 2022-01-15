/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { Alert } from "react-native";

//TODO: store the image and then download the image. Then save the downloaded image uri to firestore
// const imageToBlob = async (imageUri) => {
//   let blob;
//   const imageRef = imageUri.substring(imageUri.lastIndexOf("/"));

//   try {
//     blob = await urlToBlob(imageUri);
//     const ref = await firebase.storage().ref().child(imageRef);
//     await ref.put(blob);
//     return await ref.getDownloadURL();
//   } catch (error) {
//   } finally {
//     blob.close();
//     console.log("blob closed");
//   }

const imageToBlob = async (uri) => {
  return await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
};

export const createEvent = async (eventObj) => {
  const imageRef = eventObj.image.substring(eventObj.image.lastIndexOf("/"));
  try {
    const blob = await imageToBlob(eventObj.image);
    const ref = firebase.storage().ref().child(imageRef);
    const snapshot = ref.put(blob);

    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        console.log("loading...");
      },
      (error) => {
        Alert.alert("Line 49", error);
        blob.close();
        return;
      },
      async () => {
        const downloadedImage = await snapshot.snapshot.ref.getDownloadURL();
        await blob.close();
        await firebase
          .firestore()
          .collection("events")
          .add({ ...eventObj, image: downloadedImage });
      }
    );

    console.log("Event added!");
  } catch (error) {
    Alert.alert("event services line 69", error);
  }
};

export const updateEvent = async (key, eventObj) => {
  const imageRef = eventObj.image.substring(eventObj.image.lastIndexOf("/"));
  const ifImageAlreadyUploaded = eventObj.image.includes(
    "firebasestorage.googleapis.com"
  );

  if (!ifImageAlreadyUploaded) {
    try {
      const blob = await imageToBlob(eventObj.image);
      const ref = firebase.storage().ref().child(imageRef);
      const snapshot = ref.put(blob);

      snapshot.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log("loading...");
        },
        (error) => {
          Alert.alert("Line 49", error);
          blob.close();
          return;
        },
        async () => {
          const downloadedImage = await snapshot.snapshot.ref.getDownloadURL();
          await blob.close();
          await firebase
            .firestore()
            .collection("events")
            .doc(key)
            .update({ ...eventObj, image: downloadedImage });
        }
      );
    } catch (error) {
      Alert.alert("event services line 101", error);
    }
  } else {
    try {
      await firebase.firestore().collection("events").doc(key).update(eventObj);
    } catch (error) {
      Alert.alert("event services line 101", error);
    }
  }
};

export const deleteEvent = async (event) => {
  try {
    await firebase.firestore().collection("events").doc(event).delete();
    console.log("delete comeplete!");
  } catch (error) {
    Alert.alert("event services line 63", error);
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
    Alert.alert("event services line 72", error);
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
    Alert.alert("event services line 81", error);
  }
};
