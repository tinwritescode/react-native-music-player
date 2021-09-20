import React, { useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native";
import { AudioContext } from "../context/AudioProvider";
import TrackItem from "./TrackItem";
import colors from "../utils/colors";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const Skeleton = () => {
  const layout = useWindowDimensions();
  return (
    <SkeletonPlaceholder>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 10,
        }}
      >
        <View style={{ width: 100, height: 100 }} />
        <View style={{ marginLeft: 20 }}>
          <View
            style={{ width: layout.width / 2, height: 20, borderRadius: 4 }}
          />
          <View
            style={{
              marginTop: 6,
              width: layout.width / 2,
              height: 20,
              borderRadius: 4,
            }}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};
export default function TrackList() {
  const { assets } = useContext(AudioContext);
  return (
    <ScrollView>
      <View style={styles.container}>
        {assets &&
          assets.map(
            (
              { title, artist, album, duration, filename, thumb, date, path },
              index
            ) => {
              const newTitle = title || filename;

              return (
                <TrackItem
                  key={index}
                  title={newTitle}
                  thumb={thumb}
                  artist={artist}
                  album={album}
                  duration={duration}
                  date={date}
                  path={path}
                />
              );
            }
          )}
        {!assets && (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,

    marginLeft: 10,
    marginRight: 10,

    backgroundColor: "white",
    borderRadius: 3,

    padding: 5,
  },
});
