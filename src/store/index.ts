import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
} from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import watchlistReducer, {
  addToWatchlist,
  removeFromWatchlist,
  setWatchlist,
} from './watchlistSlice';

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

const watchlistListener = createListenerMiddleware();

const startPersistEffect = (listenerApi: any) => {
  console.log('Persisting watchlist to localStorage...');
  try {
    const state = listenerApi.getState();
    const watchlist = state.watchlist;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({watchlist}));
  } catch {
    // ignore write errors
  }
};

watchlistListener.startListening({
  actionCreator: addToWatchlist,
  effect: (_action, listenerApi) => startPersistEffect(listenerApi),
});
watchlistListener.startListening({
  actionCreator: removeFromWatchlist,
  effect: (_action, listenerApi) => startPersistEffect(listenerApi),
});
watchlistListener.startListening({
  actionCreator: setWatchlist,
  effect: (_action, listenerApi) => startPersistEffect(listenerApi),
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(watchlistListener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
