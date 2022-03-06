type Music = {
  name: string;
  id: number;
  url: string;
  artists?: any[];
  albums?: any[];
};

type State = {
  music: Music;
};

type RootState = undefined

export type { State, Music, RootState };
