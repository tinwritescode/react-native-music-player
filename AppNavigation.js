import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import MusicLibrary from "./app/screen/MusicLibrary";
import MusicPlayer from "./app/screen/MusicPlayer";
import Settings from "./app/screen/Settings";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Music List") {
            iconName = focused ? "musical-notes" : "musical-notes-outline";
          } else if (route.name === "Music Player") {
            iconName = focused ? "play-circle" : "play-circle-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Music List" component={MusicLibrary} />
      <Tab.Screen name="Music Player" component={MusicPlayer} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
