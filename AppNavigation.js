import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native";

// Bottom tab
import {
  View,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import Constants from "expo-constants";

import Ionicons from "react-native-vector-icons/Ionicons";

import MusicLibrary from "./app/screen/MusicLibrary";
import MusicPlayer from "./app/screen/MusicPlayer";
import Settings from "./app/screen/Settings";

const renderScene = SceneMap({
  musicLibrary: MusicLibrary,
  musicPlayer: MusicPlayer,
  settings: Settings,
});

export default function App() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "musicLibrary", title: "MusicLibrary" },
    { key: "musicPlayer", title: "MusicPlayer" },
    { key: "settings", title: "Settings" },
  ]);

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            <TouchableOpacity
              key={i}
              style={styles.tabItem}
              onPress={() => setIndex({ index: i })}
            >
              {/* <Ionicons name={"musical-notes"} size={20} /> */}
              <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={{ width: layout.width }}
    />

    // <Tab.Navigator
    //   screenOptions={({ route }) => ({
    //     tabBarIcon: ({ focused, color, size }) => {
    //       let iconName;

    //       if (route.name === "Music List") {
    //         iconName = focused ? "musical-notes" : "musical-notes-outline";
    //       } else if (route.name === "Music Player") {
    //         iconName = focused ? "play-circle" : "play-circle-outline";
    //       } else if (route.name === "Settings") {
    //         iconName = focused ? "settings" : "settings-outline";
    //       }
    //       // You can return any component that you like here!
    //       return <Ionicons name={iconName} size={size} color={color} />;
    //     },
    //     tabBarActiveTintColor: "tomato",
    //     tabBarInactiveTintColor: "gray",
    //   })}
    // >
    //   <Tab.Screen name="Music List" component={MusicLibrary} />
    //   <Tab.Screen name="Music Player" component={MusicPlayer} />
    //   <Tab.Screen name="Settings" component={Settings} />
    // </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
});
