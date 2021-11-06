/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { theme } from "./src/theme/index";

import { events } from "./DummyData";
import Navigator from "./src/navigation/Navigator";
import AuthenticationContextProvider from "./src/context/AuthenticationContext";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC8lYdI-WENzS-vZsCor8Xpn57vwExwPnY",
  authDomain: "bash-app-6ab17.firebaseapp.com",
  projectId: "bash-app-6ab17",
  storageBucket: "bash-app-6ab17.appspot.com",
  messagingSenderId: "59029377677",
  appId: "1:59029377677:web:a74bacc2ae51f4112388c4",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default function App() {
  const [event, setEvent] = useState(events);

  return (
    <SafeAreaView style={styles.container}>
      <AuthenticationContextProvider>
        <Navigator />
      </AuthenticationContextProvider>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.main.secondary,
  },
});
