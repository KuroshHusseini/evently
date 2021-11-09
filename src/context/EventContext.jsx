import React, { useState, useEffect, createContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const EventContext = createContext(null);

const EventContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState([]);
 
  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection("events")
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

  return (
    <EventContext.Provider value={{ event, loading }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
