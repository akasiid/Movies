import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { FavoritesService } from "../favorites/favorites.service";

@Injectable()
export class MovieService {
  private favorites: any;
  isFavorite = new BehaviorSubject(false);

  constructor(private favoritesService: FavoritesService) {}

  initFavorites () {
    this.favorites = localStorage.getItem('favorites') !== null ? JSON.parse(localStorage.getItem('favorites')) : [];
  }

  updateIsFavorite(id: number, favorites: []) {
    this.favorites = favorites;
    this.getStatus(id);
  }

  getStatus (id: number): BehaviorSubject<boolean> {
    this.favorites === null && this.initFavorites();

    this.isFavorite.next(this.favorites.findIndex(obj => obj.id === id) >= 0);
    return this.isFavorite;
  }

  setFavorite() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    this.favoritesService.change(this.favorites);
  }

  add(movie: {id: number, title: string}) {
    this.favorites = [...this.favorites, ...[movie]];
    this.setFavorite();
  }

  remove(id: number) {
    const index = this.favorites.findIndex(obj => obj.id === id);
    if (index !== -1) this.favorites.splice(index, 1);
    this.setFavorite();
  }
}
