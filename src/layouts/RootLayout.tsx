import {Outlet, useLoaderData} from 'react-router-dom';
import Navbar from '../components/Navbar';
import {useEffect} from 'react';
import Header from '../components/Header';
import {useAppDispatch} from '../store/hooks';
import {setMovies} from '../store/moviesSlice';

export default function RootLayout() {
  const {movies} = useLoaderData();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (movies && Array.isArray(movies)) dispatch(setMovies(movies));
  }, []);

  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <div className='flex flex-1 min-h-0'>
        <Navbar />
        <main className='w-0 flex-1 min-h-0 overflow-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
