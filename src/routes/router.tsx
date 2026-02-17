import {createBrowserRouter, Navigate} from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home';
import Watchlist from '../pages/Watchlist';
import {rootLoader} from './rootLoader';
import MoviePanel from '../pages/MoviePanel';
import ErrorPage from '../pages/ErrorPage';

export const router = createBrowserRouter([
  {
    id: 'root',
    element: <RootLayout />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Navigate to='movies' replace />,
      },

      {
        path: '/watchlist',
        element: <Watchlist />,
      },
      {
        index: true,
        path: '/movies',
        element: <Home />,
      },
      {
        path: '/movies/:id',
        element: <MoviePanel />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);
