import React, { useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import AudioProvider from "../context/AudioProvider";
import TrackList from "../components/TrackList";
import colors from "../utils/colors";

export default function MusicLibrary() {
  return (
    <AudioProvider>
      <View style={styles.container}>
        <Text style={styles.text}>Track List</Text>
        <TrackList />
      </View>
    </AudioProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  text: {
    backgroundColor: colors.green400,
    padding: 10,
    color: "white",
    fontWeight: "bold",

    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,

    marginLeft: 10,
    marginRight: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
});
