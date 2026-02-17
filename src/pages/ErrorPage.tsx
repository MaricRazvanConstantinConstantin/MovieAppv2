import {useRouteError, isRouteErrorResponse, Link} from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  let title = 'Something went wrong';
  let message = 'An unexpected error occurred.';

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message = error.data || 'The page you are looking for was not found.';
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-stone-950 p-6'>
      <div
        className='
          max-w-md w-full
          bg-stone-900
          border border-stone-700/50
          rounded-xl
          shadow-lg
          p-8
          text-center
          space-y-6
        '
      >
        <h1 className='text-2xl font-bold text-stone-100'>{title}</h1>

        <p className='text-stone-400 text-base leading-relaxed'>{message}</p>

        <Link
          to='/'
          className='
            inline-block mt-4
            px-5 py-2
            text-sm font-medium
            rounded-md
            bg-stone-800 text-stone-200
            hover:bg-stone-700 hover:text-white
            border border-stone-700
            transition
          '
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
