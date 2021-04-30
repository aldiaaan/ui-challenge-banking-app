import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Music from "./Music";
import { playlist } from "./Model";

const MusicPlayer = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={{ backgroundColor: "#0d0d0d", flex: 1 }}>
        <View style={styles.playlistCover}>
          <LinearGradient
            style={styles.gradient}
            colors={["#0d0d0d", "transparent", "#0d0d0d"]}
          />
          <Image style={styles.image} source={playlist.image} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  playlistCover: {
    height: 280,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    alignSelf: "center",
    height: "100%",
    width: "100%",
  },
  gradient: {
    position: "absolute",
    zIndex: 999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default MusicPlayer;
