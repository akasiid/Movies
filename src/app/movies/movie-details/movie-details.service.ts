import { Injectable }             from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Movie } from "../movies";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class MovieDetailsService {
  private key = environment.api_key;

  constructor(
    private http: HttpClient
  ) {
  }

  getMovieDetails(id: string): Observable<Movie> {
    const detailsUrl = `${environment.api_url}/movie/${id}`;
    let params = new HttpParams().set('api_key', this.key).set('language', "en-US");

    return this.http.get<Movie>(detailsUrl, {responseType: "json", params});
  }
}
