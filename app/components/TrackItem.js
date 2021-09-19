import React from "react";
import colors from "../utils/colors";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Shadow } from "react-native-shadow-2";

export default function TrackItem({ title, thumb, artist }) {
  return (
    <TouchableOpacity
      onPress={() => {}}
      activeOpacity={0.6}
      style={styles.wrapper}
    >
      <View style={styles.trackItem}>
        <Image
          style={styles.image}
          source={{ uri: "data:image/png;base64," + thumb }}
        />
        <View style={styles.trackInfo}>
          <Text style={styles.textTitle}>{title}</Text>
          <Text style={styles.textArtist}>{artist}</Text>
        </View>

        <Ionicons name="menu-outline" size={30} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,

    marginBottom: 4,
    marginLeft: 10,
    marginRight: 10,

    backgroundColor: "white",
    borderRadius: 3,
  },
  trackItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  trackInfo: {
    flex: 1,
    padding: 20,
  },
  textTitle: {
    color: "#000",
    marginBottom: 5,
    fontWeight: "bold",
  },
  textArtist: {
    color: "#000",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
});
