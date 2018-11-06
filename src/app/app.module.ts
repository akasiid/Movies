import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { ScrollableDirective } from './decorators/scrollable.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { RecommendationsComponent } from './movies/recomendation/recommendations.component';
import { MovieComponent } from './movies/movie/movie.component';
import { FavoritesComponent } from './movies/favorites/favorites.component';
import { SvgComponent } from './svg/svg.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    ScrollableDirective,
    LoadingSpinnerComponent,
    MovieDetailsComponent,
    RecommendationsComponent,
    MovieComponent,
    FavoritesComponent,
    SvgComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
