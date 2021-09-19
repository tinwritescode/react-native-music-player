import React, { useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { AudioContext } from "../context/AudioProvider";
import TrackItem from "./TrackItem";
import colors from "../utils/colors";

export default function TrackList() {
  const { assets } = useContext(AudioContext);

  return (
    <ScrollView style={styles.container}>
      {assets &&
        assets.map(
          (
            { id, title, artist, album, duration, uri, filename, thumb },
            index
          ) => {
            const newTitle = title || filename;

            return (
              <TrackItem
                key={index}
                title={newTitle}
                thumb={thumb}
                artist={artist}
              />
            );
          }
        )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
