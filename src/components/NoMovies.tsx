import ClapperBoardIcon from '../icons/ClapperBoard';

export default function NoMovies() {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-3 p-8 text-stone-300'>
      <ClapperBoardIcon />

      <p className='text-lg font-medium text-stone-200'>No movies found</p>
      <p className='text-sm text-stone-400'>
        Try adjusting your search or filters.
      </p>
    </div>
  );
}
