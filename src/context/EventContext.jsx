import React, { useState, useEffect, createContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { createEvent, updateEvent } from "./../services/eventServices";
import { Alert } from "react-native";

export const EventContext = createContext(null);

const EventContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState([]);

  const validEvents = () =>
    event
      .map((e) => e)
      .filter(
        (fe) => new Date(fe.startDateTime).getTime() >= new Date().getTime()
      );

  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection("events")
      .orderBy("startDateTime")
      .onSnapshot((querySnapshot) => {
        const eventArray = [];

        querySnapshot.forEach((documentSnapshot) => {
          eventArray.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setEvent(eventArray);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const create = (eventObj) => {
    setLoading(!loading);
    try {
      createEvent(eventObj);
      setLoading(!loading);
    } catch (err) {
      Alert.alert("There is something wrong!!!!", err.message);
    }
  };

  const update = (key, eventObj) => {
    setLoading(!loading);
    try {
      updateEvent(key, eventObj);
      setLoading(!loading);
    } catch (err) {
      Alert.alert("There is something wrong!!!!", err.message);
    }
  };
  return (
    <EventContext.Provider
      value={{ event, validEvents, create, update, loading }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
