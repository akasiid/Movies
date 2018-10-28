import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FavoritesService } from "./favorites.service";

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: [];

  @ViewChild('container') container: ElementRef;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.favoritesService.favorites.subscribe(favorites => {
      this.favorites = favorites
    });
  }

  remove(id: number) {
    this.favoritesService.remove(id, this.favorites)
  }

  toggle() {
    this.container.nativeElement.classList.toggle("_show");
  }
}
