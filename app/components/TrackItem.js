import React, { useContext } from "react";
import colors from "../utils/colors";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AudioContext } from "../context/AudioProvider";

export default function TrackItem({
  title,
  artist,
  album,
  duration,
  path,
  thumb,
  date,
  // uri,
}) {
  const { addTrack } = useContext(AudioContext);

  return (
    <TouchableOpacity
      onPress={() => {
        addTrack({
          title,
          artist,
          album,
          duration,
          path,
          thumb,
          date,
        });
      }}
      activeOpacity={0.6}
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
  trackItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
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
