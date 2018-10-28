import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GenresService }          from './genres/genres.service';
import { Observable, forkJoin }   from 'rxjs';
import { map }                    from 'rxjs/operators';

import { Movie, Page } from './movies';
import { environment } from "../../environments/environment";

/* This function add genres to movies */
function completeMovies(movies, genres) {
  return movies.map((movie) => {
    movie.genres = genres.filter(function(genre) {
      return this.indexOf(genre.id) >= 0;
    }, movie.genre_ids);
    return movie;
  });
}

/* This function join two request results */
function fork( http: HttpClient, genresService: GenresService, url, params, movies?): Observable <Page> {
  return forkJoin([
    http.get<Page>(url, {responseType: "json", params}),
    genresService.getGenres()
  ]).pipe(map((data: any[]) => {
    data[0].results = movies ? [...movies, ...completeMovies(data[0].results, data[1].genres)] : completeMovies(data[0].results, data[1].genres);
    return data[0];
  }));
}

@Injectable()
export class MoviesService {
  private popularUrl = `${environment.api_url}/movie/popular`;
  private searchUrl = `${environment.api_url}/search/movie`;
  private key = environment.api_key;

  constructor(
    private http: HttpClient,
    private genresService: GenresService,
  ) {}

   getPage(page: number): Observable <Page> {
     const params = new HttpParams().set('api_key', this.key).set('page', page + '').set('language', "en-US");

     return fork(this.http, this.genresService, this.popularUrl, params);
  }

  more(movies: Movie[], page: number, query?: string) {
    const url = query ? this.searchUrl : this.popularUrl;
    let params = new HttpParams().set('api_key', this.key).set('page', page + '').set('language', "en-US");

    if (query) {
      params = params.set('query', query).set('include_adult', "true");
    }

    return fork(this.http, this.genresService, url, params, movies);
  }

  search(query: string) {
    const params = new HttpParams().set('api_key', this.key).set('query', query).set('page', '1').set('language', "en-US").set('include_adult', "true");

    return fork(this.http, this.genresService, this.searchUrl, params);
  }
}

