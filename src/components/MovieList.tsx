import {type Movie} from '../types/Movie';
import MovieCard from './MovieCard';
export default function MovieList({movies}: {movies: Movie[]}) {
  return (
    <ul className='grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-2 bg-stone-900'>
      {movies.map((m) => (
        <li key={m.id}>
          <MovieCard movie={m} />
        </li>
      ))}
    </ul>
  );
}
