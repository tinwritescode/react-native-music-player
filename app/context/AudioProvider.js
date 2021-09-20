import * as MediaLibrary from "expo-media-library";
import TrackPlayer, {
  Capability,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  Event,
} from "react-native-track-player";

import { Button, Alert, View, Text, StyleSheet } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import MediaMeta from "react-native-media-meta";
import colors from "../utils/colors";

export const AudioContext = createContext();

export default function AudioProvider({ children }) {
  const [permissionError, setPermissionError] = useState(false);
  const [assets, setAssets] = useState();
  const [playingTrack, setPlayingTrack] = useState();
  const playbackState = usePlaybackState();

  const permissionAlert = () => {
    Alert.alert(
      "Permission required",
      "You must allow storage permission to use this app.",
      {
        text: "Allow",

        onPress: () => permissionCheck(),
      },
      { text: "Cancel", onPress: () => setPermissionError(true) }
    );
  };
  const permissionCheck = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();

    if (!permission.granted && !permission.canAskAgain) {
      // If permission not granted
      setPermissionError(true);
      return;
    }

    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();

      if (status === "denied" && canAskAgain) {
        permissionAlert();

        return;
      }
    }

    setPermissionError(false);

    // Fetch data
    MediaLibrary.getAssetsAsync({ mediaType: MediaLibrary.MediaType.audio })
      .then(async function ({ assets }) {
        let newAssets = await Promise.all(
          assets.map(async (asset) => {
            const uri = asset.uri.replace("file://", "");
            const { filename } = asset;

            const loadData = await new Promise((resolve, reject) => {
              //{
              //   id, title, artist, album, duration, path, thumb, date,
              // }
              MediaMeta.get(uri)
                .then((asset) => {
                  resolve(asset);
                })
                .catch((err) => reject(err));
            });

            return { ...loadData, uri, filename, path: asset.uri };
          })
        );

        setAssets(newAssets.filter((asset) => asset.artist));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const setupTrackPlayer = async () => {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
    });
    TrackPlayer.setRepeatMode(RepeatMode.Queue);
  };

  useEffect(() => {
    permissionCheck();
    setupTrackPlayer();
  }, []);

  const addTrack = async (asset) => {
    const {
      title,
      artist = null,
      album = null,
      duration = null,
      path = null,
      genre = null,
      thumb = null,
      date = null,
    } = asset;

    const index = await TrackPlayer.add({
      url: path,
      title,
      artist,
      album,
      genre,
      date, // RFC 3339
      artwork: "data:image/png;base64," + thumb, // Load artwork from the network
      duration, // Duration in seconds
    });

    return index;
  };

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (
      event.type === Event.PlaybackTrackChanged &&
      event.nextTrack !== undefined
    ) {
      const track = await TrackPlayer.getTrack(event.nextTrack);

      setPlayingTrack(track);
    }
  });

  const togglePlayback = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      // TODO: Perhaps present an error or restart the playlist?
    } else {
      if (playbackState === State.Paused) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  if (permissionError)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          You must grant permission to storage in order to use app.
        </Text>
      </View>
    );

  return (
    <AudioContext.Provider
      value={{
        permissionError,
        assets,
        playbackState,
        addTrack,
        togglePlayback,
        playingTrack,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    padding: 20,
    width: "100%",
    height: 100,
    backgroundColor: colors.secondary,
    color: "white",
    fontSize: 15,
    textAlign: "center",
    borderRadius: 20,
    shadowRadius: 20,
    shadowOpacity: 0.8,
  },
});
