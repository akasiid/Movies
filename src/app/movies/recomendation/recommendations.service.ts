import { Injectable }             from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Page, Movie } from "../movies";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable()
export class RecommendationsService {
  private movies: Movie [];
  private key = environment.api_key;
  private url: string;
  private params: HttpParams = new HttpParams().set('api_key', this.key).set('language', "en-US");

  constructor (
    private http: HttpClient
  ) { }

  setUrl (id: string, isSimilar: boolean) {
    this.url = isSimilar ? `${environment.api_url}/movie/${id}/similar` : `${environment.api_url}/movie/${id}/recommendations`;
  }

  getRecommendations(): Observable<Page> {
    const params = this.params;
    return this.http.get<Page>(this.url, {responseType: "json", params});
  }

  next(movies: Movie[], pageNumber: number): Observable<Movie[]> {
    const params = this.params.set('page', `${pageNumber}`);

    return this.http.get<Page>(this.url, {responseType: "json", params}).pipe(map((data: any) => {
      data.results = [...movies, ...data.results];
      return data.results;
    }));
  }
}
