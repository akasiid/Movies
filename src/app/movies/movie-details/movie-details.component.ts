import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MovieDetailsService } from "./movie-details.service";
import { Movie } from "../movies";


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  providers: [MovieDetailsService],
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movieDetails: Movie;
  private id: string;
  private sub: any;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private movieDetailsService: MovieDetailsService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getMovieDetails();
    });
  }

  getMovieDetails() {
    this.isLoading = true;
    this.movieDetailsService.getMovieDetails(this.id)
      .subscribe(movie => {
        this.isLoading = false;
        this.movieDetails = movie
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
