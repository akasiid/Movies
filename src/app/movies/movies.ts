export interface Movie {
  id: number,
  title: string,
  poster_path?: string,
  backdrop_path?: string,
  overview?: string,
  genre_ids?: [],
  genres: Genre[]
}

export interface Page {
  page: number,
  total_results: number,
  total_pages: number,
  results: Movie[]
}

export interface Genres {
  genres: Genre[]
}

export interface Genre {
  id: number,
  name: string
}
