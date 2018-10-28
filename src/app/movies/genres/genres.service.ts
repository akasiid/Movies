import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Genres } from '../movies';
import { environment } from "../../../environments/environment";

const params = new HttpParams().set('api_key', environment.api_key).set('language', "en-US");

@Injectable()
export class GenresService {
  private genresUrl = `${environment.api_url}/genre/movie/list`;

  constructor(
    private http: HttpClient
  ) {}

  getGenres(): Observable<Genres> {
    return this.http.get<Genres>(this.genresUrl, {responseType: "json", params});
  }
}

