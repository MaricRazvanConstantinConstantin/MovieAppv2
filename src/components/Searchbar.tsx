import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {GENRE_OPTIONS} from '../types/Genre';
import {SORT_BY, SORT_DIR, SORT_OPTIONS, type SortKey} from '../types/sort';

export function isSortKey(value: string | null): value is SortKey {
  if (!value) return false;
  const [by, dir] = value.split('-');
  return (
    (SORT_BY as readonly string[]).includes(by) &&
    (SORT_DIR as readonly string[]).includes(dir)
  );
}

export default function Searchbar() {
  const [params, setParams] = useSearchParams();

  const qParam = params.get('q') ?? '';
  const genreParam = params.get('genre') ?? '';
  const sortParam = params.get('sort') ?? 'title-asc';

  const [qInput, setQInput] = useState(qParam);
  useEffect(() => setQInput(qParam), [qParam]);

  useEffect(() => {
    const t = setTimeout(() => {
      setParams((prev) => {
        const p = new URLSearchParams(prev);
        const v = qInput.trim();
        if (v) p.set('q', v);
        else p.delete('q');
        return p;
      });
    }, 600);
    return () => clearTimeout(t);
  }, [qInput, setParams]);

  const onGenreChange = (value: string) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev);
      if (value) p.set('genre', value);
      else p.delete('genre');
      return p;
    });
  };

  const onSortChange = (value: SortKey) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set('sort', value);
      return p;
    });
  };

  const clearAll = () => {
    setParams((prev) => {
      const p = new URLSearchParams(prev);
      p.delete('q');
      p.delete('genre');
      p.delete('sort');
      return p;
    });
    setQInput('');
  };

  return (
    <div className='flex flex-col xl:flex-row gap-4 p-4 bg-stone-950 text-stone-200 shadow'>
      <input
        value={qInput}
        onChange={(e) => setQInput(e.target.value)}
        placeholder='Search by title…'
        aria-label='Search by title'
        className='
        w-full xl:w-2/3 rounded-md border border-stone-700 bg-stone-800
        px-3 py-2 text-sm text-stone-200 placeholder-stone-400
        focus:outline-none focus:ring-0.5 focus:ring-amber-400 focus:border-amber-400
      '
      />

      <div className='flex flex-wrap gap-4 items-center'>
        <div className='flex flex-col'>
          <label
            htmlFor='genre'
            className='text-xs font-semibold text-stone-400 mb-1'
          >
            Genre
          </label>
          <select
            id='genre'
            value={genreParam}
            onChange={(e) => onGenreChange(e.target.value)}
            className='
            rounded-md border border-stone-700 bg-stone-800
            px-3 py-2 text-sm text-stone-200
            focus:outline-none focus:ring-0.5 focus:ring-amber-400 focus:border-amber-400
          '
          >
            {GENRE_OPTIONS.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <label
            htmlFor='sort'
            className='text-xs font-semibold text-stone-400 mb-1'
          >
            Sort
          </label>
          <select
            id='sort'
            value={sortParam}
            onChange={(e) => onSortChange(e.target.value as SortKey)}
            className='
            rounded-md border border-stone-700 bg-stone-800
            px-3 py-2 text-sm text-stone-200
            focus:outline-none focus:ring-0.5 focus:ring-amber-400 focus:border-amber-400
          '
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={clearAll}
          className='
          self-end rounded-md bg-stone-800 border border-stone-700
          px-4 py-2 text-sm
          hover:bg-stone-700 transition
          focus:outline-none focus:ring-0.5 focus:ring-amber-400
        '
        >
          Clear
        </button>
      </div>
    </div>
  );
}
