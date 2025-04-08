import { Movie } from './Movie';

export interface Carousel {
  title: string;
  movies: Movie[];
  showNumbers?: boolean;
  itemsPerSlide: number;
}
