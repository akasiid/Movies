import { Component } from '@angular/core';
import { FavoritesService } from "./movies/favorites/favorites.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [FavoritesService],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Movies';
}
