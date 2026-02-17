import {Outlet, useLoaderData} from 'react-router-dom';
import Navbar from '../components/Navbar';
import type {RootLoaderData} from '../routes/rootLoader';
import {useEffect, useState} from 'react';
import Header from '../components/Header';

export type RootOutletContext = {
  movies: RootLoaderData['movies'];
  watchlist: number[];

  handleAddToWatchlist: (id: number) => void;
  handleRemoveFromWatchlist: (id: number) => void;
};

const LS_WATCHLIST_KEY = 'movieapp.watchlist';

function readWatchlistFromStorage(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(LS_WATCHLIST_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const nums = parsed
        .map((v) => Number(v))
        .filter((v) => Number.isFinite(v));
      return Array.from(new Set(nums));
    }
    return [];
  } catch {
    return [];
  }
}

function writeWatchlistToStorage(list: number[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LS_WATCHLIST_KEY, JSON.stringify(list));
  } catch {}
}

export default function RootLayout() {
  const {movies} = useLoaderData();
  const [watchlist, setWatchlist] = useState<number[]>(() =>
    readWatchlistFromStorage(),
  );

  useEffect(() => {
    writeWatchlistToStorage(watchlist);
  }, [watchlist]);

  const handleAddToWatchlist = (id: number) =>
    setWatchlist((prev) => [...prev, id]);

  const handleRemoveFromWatchlist = (id: number) =>
    setWatchlist((prev) => prev.filter((el) => el !== id));

  const context: RootOutletContext = {
    movies,
    watchlist: watchlist,
    handleAddToWatchlist: handleAddToWatchlist,
    handleRemoveFromWatchlist: handleRemoveFromWatchlist,
  };

  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <div className='flex flex-1 min-h-0'>
        <Navbar />
        <main className='w-0 flex-1 min-h-0 overflow-auto'>
          <Outlet context={context} />
        </main>
      </div>
    </div>
  );
}
