import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

type WatchlistState = {
  ids: number[];
};

const initialState: WatchlistState = {ids: []};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    setWatchlist(state, action: PayloadAction<number[]>) {
      state.ids = Array.from(new Set(action.payload.map((v) => Number(v))));
    },
    addToWatchlist(state, action: PayloadAction<number>) {
      const id = Number(action.payload);
      if (!state.ids.includes(id)) state.ids.push(id);
    },
    removeFromWatchlist(state, action: PayloadAction<number>) {
      const id = Number(action.payload);
      state.ids = state.ids.filter((x) => x !== id);
    },
  },
});

export const {setWatchlist, addToWatchlist, removeFromWatchlist} =
  watchlistSlice.actions;
export default watchlistSlice.reducer;
