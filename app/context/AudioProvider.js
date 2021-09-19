import * as MediaLibrary from "expo-media-library";

import { Button, Alert, View, Text, StyleSheet } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import MediaMeta from "react-native-media-meta";
import colors from "../utils/colors";

export const AudioContext = createContext();

export default function AudioProvider({ children }) {
  let [permissionError, setPermissionError] = useState(false);
  let [assets, setAssets] = useState();

  const permissionAlert = () => {
    Alert.alert(
      "Permission required",
      "You must allow storage permission to use this app.",
      {
        text: "Grant",

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
              MediaMeta.get(uri)
                .then(({ id, title, artist, album, duration, path, thumb }) => {
                  resolve({ id, title, artist, album, duration, path, thumb });
                })
                .catch((err) => reject(err));
            });

            return { ...loadData, uri, filename };
          })
        );

        setAssets(newAssets.filter((asset) => asset.artist));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    permissionCheck();
  }, []);

  if (permissionError)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          You must grant permission to storage in order to use app.
        </Text>
      </View>
    );

  return (
    <AudioContext.Provider value={{ permissionError, assets }}>
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
