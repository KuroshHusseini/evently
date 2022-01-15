import React, { useState, useEffect, createContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { createEvent, updateEvent } from "./../services/eventServices";
import { Alert } from "react-native";

export const EventContext = createContext(null);

const EventContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [event, setEvent] = useState([]);

  const validEvents = () =>
    event
      .map((e) => e)
      .filter(
        (fe) => new Date(fe.startDateTime).getTime() >= new Date().getTime()
      );

  useEffect(() => {
    setIsLoading(true)
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
        setIsLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const create = async (eventObj) => {
    setIsLoading(true);
    try {
      await createEvent(eventObj);
      setIsLoading(false);
    } catch (err) {
      Alert.alert("There is something wrong!!!!", err.message);
      setIsLoading(false)
    }
  };

  const update = (key, eventObj) => {
    setIsLoading(true);
    try {
      updateEvent(key, eventObj);
      setIsLoading(false);
    } catch (err) {
      Alert.alert("There is something wrong!!!!", err.message);
      setIsLoading(false)
    }
  };
  return (
    <EventContext.Provider
      value={{ event, validEvents, create, update, isLoading }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
