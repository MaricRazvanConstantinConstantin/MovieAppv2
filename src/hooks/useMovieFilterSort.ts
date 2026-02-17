import {useSearchParams} from 'react-router-dom';
import type {Movie} from '../types/Movie';
import {useCallback} from 'react';
import {DEFAULT_SORT, isSortKey, type SortKey} from '../types/sort';

export function useMovieFilterSort() {
  const [params] = useSearchParams();

  const q = (params.get('q') ?? '').toLowerCase();
  const genre = params.get('genre') ?? '';
  const sortKey: SortKey = isSortKey(params.get('sort'))
    ? (params.get('sort') as SortKey)
    : DEFAULT_SORT;

  const filterFunction = useCallback(
    (m: Movie) => {
      const matchTitle = q ? m.title.toLowerCase().includes(q) : true;
      const matchGenre = genre ? m.genre === genre : true;
      return matchTitle && matchGenre;
    },
    [q, genre],
  );

  const sortFunction = useCallback(
    (a: Movie, b: Movie) => {
      switch (sortKey) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'rating-asc':
          return (a.rating ?? 0) - (b.rating ?? 0);
        case 'rating-desc':
          return (b.rating ?? 0) - (a.rating ?? 0);
        default:
          return 0;
      }
    },
    [sortKey],
  );

  const transform = useCallback(
    (list: Movie[]) => {
      return list.filter(filterFunction).sort(sortFunction);
    },
    [filterFunction, sortFunction],
  );

  return {
    q,
    genre: genre || null,
    sortKey,
    filterFunction,
    sortFunction,
    transform,
  };
}
