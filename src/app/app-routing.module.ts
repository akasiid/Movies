import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from "./movies/movie-details/movie-details.component";
import { MoviesComponent } from "./movies/movies.component";

const routes: Routes = [
  { path: '', component: MoviesComponent },
  { path: 'details/:id', component: MovieDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
