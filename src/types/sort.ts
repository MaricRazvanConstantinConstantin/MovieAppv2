export const SORT_BY = ['title', 'rating'] as const;
export const SORT_DIR = ['asc', 'desc'] as const;

export type SortByKey = typeof SORT_BY[number];          // 'title' | 'rating'
export type SortDirectionKey = typeof SORT_DIR[number];  // 'asc' | 'desc'
export type SortKey = `${SortByKey}-${SortDirectionKey}`; // 'title-asc' | ...

export const DEFAULT_SORT: SortKey = 'title-asc';

export const SORT_OPTIONS: {value: SortKey; label: string}[] = [
  {value: 'title-asc', label: 'Title ↑'},
  {value: 'title-desc', label: 'Title ↓'},
  {value: 'rating-asc', label: 'Rating ↑'},
  {value: 'rating-desc', label: 'Rating ↓'},
];

export function isSortKey(value: string | null): value is SortKey {
  if (!value) return false;
  const [by, dir] = value.split('-');
  return (SORT_BY as readonly string[]).includes(by) &&
         (SORT_DIR as readonly string[]).includes(dir);
}
