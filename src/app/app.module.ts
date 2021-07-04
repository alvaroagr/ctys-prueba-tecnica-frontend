import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { AddScheduleComponent } from './components/add-schedule/add-schedule.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardClientComponent } from './components/board-client/board-client.component';
import { BoardUserComponent } from './components/board-user/board-user.component';

import { authInterceptorProviders } from './helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieItemComponent,
    MovieDetailComponent,
    AddMovieComponent,
    AddScheduleComponent,
    NotFoundComponent,
    ErrorModalComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardClientComponent,
    BoardUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
