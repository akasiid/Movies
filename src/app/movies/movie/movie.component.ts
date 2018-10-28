import { Component, Input, OnInit } from '@angular/core';
import { Movie } from "../movies";
import { MovieService } from "./movie.service";
import { FavoritesService } from "../favorites/favorites.service";

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  providers: [MovieService],
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  isFavorite: boolean;

  @Input() movie: Movie;
  @Input() details: boolean;
  @Input() title: string;

  constructor(
      private movieService: MovieService,
      private favoritesService: FavoritesService,
    ) { }

  ngOnInit() {
    this.initFavorites();
    this.favoritesService.favorites.subscribe(favorites => {
      this.movieService.updateIsFavorite(this.movie.id, favorites);
    });
    this.movieService.getStatus(this.movie.id).subscribe(isFavorite => {
      this.isFavorite = isFavorite;
    });
  }

  initFavorites () {
    this.movieService.initFavorites();
  }

  favoritesHandler(e) {
    if (this.isFavorite) {
      this.movieService.remove(this.movie.id)
    } else {
      this.movieService.add({id: this.movie.id, title: this.movie.title})
    }
  }
}
