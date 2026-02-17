import type {LoaderFunctionArgs} from 'react-router-dom';
import {movies} from '../data';

export async function rootLoader(_: LoaderFunctionArgs) {
  return {movies};
}

export type RootLoaderData = Awaited<ReturnType<typeof rootLoader>>;
