import React, { useContext } from "react";
import AudioProvider from "../context/AudioProvider";
import MusicPlayer from "../components/MusicPlayer";

export default function PlayerPage() {
  return (
    <AudioProvider>
      <MusicPlayer />
    </AudioProvider>
  );
}
