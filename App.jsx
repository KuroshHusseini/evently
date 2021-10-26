/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
//* React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//* screens
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import CartScreen from "./src/screens/CartScreen";
import CreatedScreen from "./src/screens/CreatedScreen";
//* dummy data
import { events } from "./DummyData";

const Tab = createBottomTabNavigator();

export default function App() {
  const [event, setEvent] = useState(events);
  console.log("🚀 ~ file: App.jsx ~ line 23 ~ App ~ event", event);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            children={() => <HomeScreen event={event} />}
          />
          <Tab.Screen
            name="Cart"
            children={() => <CartScreen event={event} />}
          />
          <Tab.Screen
            name="Created"
            children={() => <CreatedScreen event={event} />}
          />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
