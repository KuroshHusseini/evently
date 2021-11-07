/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { theme } from "./src/theme/index";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import apiKeys from "./config/keys";

import Navigator from "./src/navigation/Navigator";
import AuthenticationContextProvider from "./src/context/AuthenticationContext";

export default function App() {
  
  if (!firebase.apps.length) {
    firebase.initializeApp(apiKeys.firebaseConfig);
    console.log("Connected to Firebase");
  }

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
