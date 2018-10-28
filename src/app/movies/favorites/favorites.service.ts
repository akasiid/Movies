import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable()
export class FavoritesService {
  favorites = new BehaviorSubject(JSON.parse(localStorage.getItem('favorites')));
  constructor() {}

  change(favorites: []) {
    this.favorites.next(favorites);
  }

  remove(id: number, favorites: any) {
    const index = favorites.findIndex(obj => obj.id === id);
    if (index !== -1) favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.favorites.next(favorites);
  }
}
