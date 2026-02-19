import {combineReducers, configureStore} from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import watchlistReducer from './watchlistSlice';

const rootReducer = combineReducers({
  movies: moviesReducer,
  watchlist: watchlistReducer,
});

const LOCAL_STORAGE_KEY = 'movieapp_state';

function loadState() {
  try {
    const serialized = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch (e) {
    return undefined;
  }
}

const preloadedState = loadState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  try {
    const state = store.getState();
    const toPersist = {watchlist: state.watchlist};
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toPersist));
  } catch (e) {
    // ignore
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
