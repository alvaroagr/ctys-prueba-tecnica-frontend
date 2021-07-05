import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Room } from 'src/app/Room';
import { Movie } from 'src/app/Movie';
import { Schedule } from 'src/app/Schedule';

import { RoomService } from 'src/app/services/room.service';
import { MovieService } from 'src/app/services/movie.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css'],
})
export class AddScheduleComponent implements OnInit {
  showMovieForm: boolean;
  subscription: Subscription;
  subModal: Subscription;

  // Schedule Data
  movieId: number = -1;
  roomId: number = -1;
  // startTime: Date = new Date();
  startTimeHour: string = '';
  startTimeMinute: string = '';
  endTimeHour: string = '';
  endTimeMinute: string = '';
  // endTime: Date = new Date();

  // New Movie Data
  name: string;
  description: string;
  image: string;
  showError: boolean;

  showErrorModal: boolean;
  errors: string[] = [];

  movies: Movie[] = [];
  rooms: Room[] = [];

  constructor(
    private roomService: RoomService,
    private movieService: MovieService,
    private scheduleService: ScheduleService,
    private uiService: UiService,
    private router: Router
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showMovieForm = value));
    this.subModal = this.uiService
      .onToggleModal()
      .subscribe((value) => (this.showErrorModal = value));
  }

  ngOnInit(): void {
    this.roomService.getRooms().subscribe((rooms) => (this.rooms = rooms));
    this.movieService.getMovies().subscribe((movies) => (this.movies = movies));
  }

  toggleMovieForm(): void {
    this.uiService.toggleMovieForm();
  }

  toggleErrorModal(): void {
    this.uiService.toggleErrorModal();
  }

  async onSubmit() {
    this.errors = [];
    if (this.roomId === -1)
      this.errors.push('Debes seleccionar una sala para la película');
    if (!this.startTimeHour || !this.startTimeMinute)
      this.errors.push('Debes colocar un horario de inicio');
    if (!this.endTimeHour || !this.startTimeMinute)
      this.errors.push('Debes colocar un horario de fin');
    if (this.showMovieForm) {
      if (!this.name)
        this.errors.push('Debes incluir el nombre de la película');
      if (!this.description)
        this.errors.push('Debes incluir una descripcion para la película');
      if (!this.image)
        this.errors.push('Debes incluir una imagen de la película');
      if (this.errors.length > 0) {
        this.showErrorModal = true;
        return;
      }
      const movie: Movie = {
        name: this.name,
        description: this.description,
        image: this.image,
      };
      this.movieService.addMovie(movie).subscribe(async (newMovie) => {
        await (this.movieId = newMovie.id as number);
        const schedule: Schedule = {
          roomId: this.roomId,
          movieId: this.movieId,
          startTime: new Date(
            2022,
            0,
            1,
            parseInt(this.startTimeHour),
            parseInt(this.startTimeMinute)
          ),
          endTime: new Date(
            2022,
            0,
            1,
            parseInt(this.endTimeHour),
            parseInt(this.endTimeMinute)
          ),
        };

        this.scheduleService
          .addSchedule(schedule)
          .subscribe((schedule) =>
            this.router.navigate([`/movies/${schedule.movieId}`])
          );
      });
    } else {
      if (this.movieId === -1)
        this.errors.unshift('Debes seleccionar una película existente');
      if (this.errors.length > 0) {
        this.showErrorModal = true;
        return;
      }
      const schedule: Schedule = {
        roomId: this.roomId,
        movieId: this.movieId,
        startTime: new Date(
          2022,
          0,
          1,
          parseInt(this.startTimeHour),
          parseInt(this.startTimeMinute)
        ),
        endTime: new Date(
          2022,
          0,
          1,
          parseInt(this.endTimeHour),
          parseInt(this.endTimeMinute)
        ),
      };

      this.scheduleService
        .addSchedule(schedule)
        .subscribe((schedule) =>
          this.router.navigate([`/movies/${schedule.movieId}`])
        );
    }
  }
}
