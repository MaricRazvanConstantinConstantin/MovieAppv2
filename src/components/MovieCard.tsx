import {useNavigate} from 'react-router-dom';
import {type Movie} from '../types/Movie';
import ToggleSwitch from './ToggleSwitch';
import EyeIcon from '../icons/Eye';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {addToWatchlist, removeFromWatchlist} from '../store/watchlistSlice';

export default function MovieCard({movie}: {movie: Movie}) {
  const dispatch = useAppDispatch();
  const watchlist = useAppSelector((s) => s.watchlist.ids);
  const inWatchlist = watchlist.includes(movie.id);
  const navigate = useNavigate();

  const goToDetails = () => navigate(`/movies/${movie.id}`);

  return (
    <div
      role='button'
      tabIndex={0}
      onClick={goToDetails}
      onKeyDown={(e) => {
        if (e.key === ' ') {
          e.preventDefault();
          goToDetails();
        }
      }}
      className='
        group
        flex flex-col aspect-3/4
        border border-stone-700/60
        bg-stone-900
        shadow-sm
        transition
        cursor-pointer
        hover:shadow-lg hover:border-stone-500
        focus:outline-none focus:ring-2 focus:ring-offset-2
        hover:bg-stone-800/50
      '
      aria-label={`View details for ${movie.title}`}
    >
      <img
        className='object-contain w-full bg-stone-800/60'
        src={'/images/' + movie.image}
        alt={`${movie.title} poster`}
        draggable={false}
      />

      <div className='flex flex-col gap-2 p-3 items-center text-stone-200'>
        <h3 className='text-base font-semibold text-stone-100 line-clamp-2 text-center group-hover:text-white'>
          {movie.title}
        </h3>

        <div className='flex gap-2 items-center justify-center text-sm'>
          <span className='px-2 py-0.5 rounded-full bg-stone-800 text-stone-300'>
            {movie.genre}
          </span>
          <span
            className={
              'rating font-semibold ' +
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

        <div className='flex gap-2 items-center justify-center pt-1'>
          <div
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <ToggleSwitch
              isActive={inWatchlist}
              handleToggle={() => {
                inWatchlist
                  ? dispatch(removeFromWatchlist(movie.id))
                  : dispatch(addToWatchlist(movie.id));
              }}
              icon={<EyeIcon />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
