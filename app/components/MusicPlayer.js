import React, { useContext, useEffect, useRef } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Text,
  Easing,
} from "react-native";
import AudioProvider, { AudioContext } from "../context/AudioProvider";
import { State } from "react-native-track-player";

export default function MusicPlayer() {
  const context = useContext(AudioContext);
  let spinValue = useRef(new Animated.Value(0)).current;
  const { playbackState, playingTrack, togglePlayback } = context;

  // Spinning effect
  const runAnimation = () => {
    spinValue.setValue(0);

    Animated.timing(spinValue, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: true, // To make use of native driver for performance
    }).start((o) => {
      if (o.finished) {
        runAnimation();
      }
    });
  };

  useEffect(() => {
    return () => {
      spinValue.stopAnimation();
    };
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <AudioProvider>
      <View style={styles.container}>
        <View
          style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
        >
          {playingTrack?.title && (
            <>
              <Animated.Image
                source={{ uri: playingTrack.artwork }}
                style={{
                  width: 300,
                  height: 300,
                  borderRadius: 150,
                  transform: [{ rotate: spin }],
                }}
              />

              <Text
                style={{ fontWeight: "bold", fontSize: 30, paddingTop: 50 }}
              >
                {playingTrack.title}
              </Text>
              <Text>{playingTrack.artist}</Text>
            </>
          )}
        </View>

        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            togglePlayback(playbackState);
            runAnimation();
          }}
        >
          <Ionicons
            name={
              playbackState === State.Playing ? "pause-circle" : "play-circle"
            }
            size={150}
            color="#111"
          />
        </TouchableOpacity>
      </View>
    </AudioProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
