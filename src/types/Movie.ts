import type {Genre} from './Genre';

export type Movie = {
  id: number;
  title: string;
  image: string;
  genre: Genre;
  rating: number;
  description: string;
  actors: string[];
};
