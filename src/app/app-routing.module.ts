import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent } from './components/movies/movies.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { AddScheduleComponent } from './components/add-schedule/add-schedule.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BoardClientComponent } from './components/board-client/board-client.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';

const routes: Routes = [
  // { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/add', component: AddMovieComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'schedules', component: AddScheduleComponent },
  // TUTORIAL
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'cli', component: BoardClientComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
