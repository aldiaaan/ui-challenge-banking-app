import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { MusicModel } from "./Model";

interface MusicProps {
  music: MusicModel;
}

const Music = ({ music }: MusicProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.cover} source={music.cover} />
      <View style={styles.context}>
        <Text style={styles.title}>{music.title}</Text>
        <Text style={styles.subtitle}>{music.by}</Text>
      </View>
    </View>
  );
};

const ROW_HEIGHT = 64;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  subtitle: {
    color: "#9ca3af",
    marginTop: 2,
  },
  container: {
    height: ROW_HEIGHT,
    // backgroundColor: "lightblue",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  context: {
    marginLeft: 12,
    flex: 1,
    // backgroundColor: "pink",
  },
  cover: {
    height: ROW_HEIGHT - 8,
    width: ROW_HEIGHT - 8,
    borderRadius: 36,
  },
});

export default Music;
