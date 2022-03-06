type Music = {
  name: string;
  id: number;
  url: string;
  artists?: any[];
  albums?: any[];
};

type State = {
  currentMusicInfo: Music;
};

type RootState = undefined

export type { State, Music, RootState };
