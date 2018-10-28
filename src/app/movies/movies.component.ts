import { Component, OnInit } from '@angular/core';

import { MoviesService } from './movies.service';
import { GenresService }  from "./genres/genres.service";

import { Movie } from './movies';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  providers: [MoviesService, GenresService],
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit {
  movies: Movie[];
  page: number;
  query: string;
  isLoading = false;

  constructor(
    private moviesService: MoviesService,
  ) {}

  ngOnInit() {
    this.getPopular();
  }

  getPopular(): void {
    this.page = 1;
    this.moviesService.getPage(this.page)
      .subscribe(page => this.movies = page.results);
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this.page++;
      this.isLoading = true;
      this.moviesService.more(this.movies, this.page, this.query)
        .subscribe(page => {
          this.isLoading = false;
          this.movies = page.results;
        });
    }
  }

  search(value) {
    if (!value) { this.getPopular() }
    this.page = 1;
    this.query = value;
    this.moviesService.search(value)
      .subscribe(page => this.movies = page.results);
  }
}
