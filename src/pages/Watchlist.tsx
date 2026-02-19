import MovieList from '../components/MovieList';
import Searchbar from '../components/Searchbar';
import {useMovieFilterSort} from '../hooks/useMovieFilterSort';
import {useMemo} from 'react';
import NoMovies from '../components/NoMovies';
import {useAppSelector} from '../store/hooks';

export default function Watchlist() {
  const movies = useAppSelector((s) => s.movies.movies);
  const watchlist = useAppSelector((s) => s.watchlist.ids);
  const {transform} = useMovieFilterSort();

  const watchlistMovies = movies.filter((m) => watchlist.includes(m.id));

  const finalMovies = useMemo(
    () => transform(watchlistMovies),
    [watchlistMovies, transform],
  );

  return (
    <div className='h-full flex flex-col min-h-0 w-full'>
      <Searchbar />
      <div className='flex-1 min-h-0 overflow-y-auto bg-stone-900'>
        {finalMovies.length === 0 ? (
          <NoMovies />
        ) : (
          <MovieList movies={finalMovies} />
        )}
      </div>
    </div>
  );
}
