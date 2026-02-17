import {useOutletContext, useParams, useSearchParams} from 'react-router-dom';
import type {RootOutletContext} from '../layouts/RootLayout';
import {useRootContext} from '../hooks/useRootContext';

export default function MoviePanel() {
  const {movies} = useOutletContext<RootOutletContext>();

  const params = useParams();
  const idRaw = params.id ?? '';
  const id = Number(idRaw);

  if (!Number.isFinite(id)) {
    return <div className='p-6 text-stone-300'>Invalid id parameter</div>;
  }

  const movie = movies.find((m) => m.id === id) ?? movies[id];

  if (!movie) {
    return (
      <div className='p-6 text-stone-300'>No existing movie with given id.</div>
    );
  }

  const {watchlist, handleAddToWatchlist, handleRemoveFromWatchlist} =
    useRootContext();
  const inWatchlist = watchlist.includes(movie.id);

  return (
    <div className='h-full w-full bg-stone-900'>
      <div className='shadow-sm overflow-hidden bg-stone-900'>
        <div className='p-4 md:p-6 space-y-6'>
          <div className='flex flex-col md:flex-row gap-6 min-w-0'>
            <div className='shrink-0 w-full md:w-[320px] lg:w-[360px]'>
              <div className='aspect-20/21 w-full overflow-hidden rounded-lg bg-stone-950/60'>
                <img
                  className='h-full w-full object-contain'
                  src={'/images/' + movie.image}
                  alt={movie.title + ' poster'}
                />
              </div>
            </div>

            <div className='min-w-0 flex-1 text-stone-200'>
              <h1 className='text-2xl font-semibold text-stone-100 leading-tight break-words flex justify-between items-center'>
                {movie.title}
                <div className='mt-6 flex flex-wrap gap-3'>
                  <button
                    onClick={() => {
                      inWatchlist
                        ? handleRemoveFromWatchlist(movie.id)
                        : handleAddToWatchlist(movie.id);
                    }}
                    className={
                      'px-4 py-2 rounded-md text-sm font-medium border transition ' +
                      (inWatchlist
                        ? 'bg-stone-800 text-stone-200 border-stone-700 hover:bg-stone-700'
                        : 'bg-amber-500 text-stone-900 border-amber-400 hover:bg-amber-400')
                    }
                  >
                    {inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
                  </button>
                </div>
              </h1>

              <div className='mt-3 flex flex-wrap items-center gap-2'>
                <span className='px-3 py-1 rounded-full bg-stone-800 text-stone-300 text-xs'>
                  {movie.genre}
                </span>
                <span
                  className={
                    'rating text-sm font-semibold ' +
                    (movie.rating < 5
                      ? 'text-red-400'
                      : movie.rating < 8
                        ? 'text-yellow-400'
                        : 'text-green-400')
                  }
                >
                  {movie.rating}
                </span>
              </div>

              {movie.actors && movie.actors.length > 0 && (
                <div className='mt-5'>
                  <h2 className='text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2'>
                    Actors
                  </h2>
                  <ul className='flex flex-wrap gap-2'>
                    {movie.actors.map((actor) => (
                      <li
                        key={actor}
                        className='px-2.5 py-1 rounded-md bg-stone-800 text-stone-300 text-xs'
                      >
                        {actor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {(movie.description ?? '').trim().length > 0 && (
            <div className='border-t border-stone-800 pt-4'>
              <h2 className='text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2'>
                Description
              </h2>
              <p className='text-stone-300 leading-relaxed break-words'>
                {movie.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
