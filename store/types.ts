type Music = {
  name: string;
  id: number;
  url?: string;
  ar?: { name: string }[];
  al?: { picUrl: string };
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
  description: string | null;
  creator: { avatarUrl: string; nickname: string };
  createTime: number;
  updateTime: number;
};

type PlaylistState = {
  currentPlaylistInfo: Playlist;
};

type Controller = {
  duration: number;
  currentTime: number;
  playStatus: boolean;
};

type RootState = {
  tableLoading: boolean;
};

export type { State, Music, RootState, Playlist, PlaylistState, Controller };
