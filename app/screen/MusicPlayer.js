import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MusicPlayer() {
  return (
    <View style={styles.container}>
      <Text>Music Player</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
