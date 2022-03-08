type Music = {
  name: string;
  id: number;
  url?: string;
  artists?: any[];
  albums?: any[];
  playStatus: boolean;
};

type State = {
  currentMusicInfo: Music;
};

type Playlist = {
  name: string;
  coverImgUrl: string;
  tracks: Music[];
  tags: string[];
  id: number;
};

type PlaylistState = {
  currentPlaylistInfo: Playlist;
};

type RootState = undefined;

export type { State, Music, RootState, Playlist, PlaylistState };
