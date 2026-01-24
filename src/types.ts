export type Screen = 'start' | 'buttons' | 'video';

export interface AppState {
  currentScreen: Screen;
  selectedVideo: number | null;
}
