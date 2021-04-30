import { ImageSourcePropType } from "react-native";

export interface MusicModel {
  title: string;
  by: string;
  cover: ImageSourcePropType;
}

export interface PlaylistModel {
  title: string;
  image: ImageSourcePropType;
  musics: MusicModel[];
}

export const musics: MusicModel[] = [
  {
    title: "DAYBREAK FRONTLINE",
    by: "Raise a Suilen",
    cover: require("./assets/1.png"),
  },
];

export const playlist: PlaylistModel = {
  title: "hololive IDOL PROJECT オリジナル楽曲",
  image: require("./assets/playlist.jpeg"),
  musics,
};
