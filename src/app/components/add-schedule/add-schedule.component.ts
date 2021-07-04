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
  }

  ngOnInit(): void {
    this.roomService.getRooms().subscribe((rooms) => (this.rooms = rooms));
    this.movieService.getMovies().subscribe((movies) => (this.movies = movies));
  }

  toggleMovieForm(): void {
    this.uiService.toggleMovieForm();
  }

  onSubmit() {
    if (this.showMovieForm) {
      if (!this.name || !this.description) {
        alert('ERROR, FUCK OFF');
        return;
      }
      const movie: Movie = {
        name: this.name,
        description: this.description,
        image: this.image,
      };
      // @todo Find a way to refactor code to not have callback hell and code repetition
      this.movieService.addMovie(movie).subscribe(async (newMovie) => {
        await (this.movieId = newMovie.id as number);
        const schedule: Schedule = {
          roomId: this.roomId,
          movieId: this.movieId,
          startTime: `${
            parseInt(this.startTimeHour) < 10
              ? `0${this.startTimeHour}`
              : `${this.startTimeHour}`
          }:${
            parseInt(this.startTimeMinute) < 10
              ? `0${this.startTimeMinute}`
              : `${this.startTimeMinute}`
          }`,
          endTime: `${
            parseInt(this.endTimeHour) < 10
              ? `0${this.endTimeHour}`
              : `${this.endTimeHour}`
          }:${
            parseInt(this.endTimeMinute) < 10
              ? `0${this.endTimeMinute}`
              : `${this.endTimeMinute}`
          }`,
        };

        this.scheduleService
          .addSchedule(schedule)
          .subscribe((schedule) =>
            this.router.navigate([`/movies/${schedule.movieId}`])
          );
      });
    } else {
      const schedule: Schedule = {
        roomId: this.roomId,
        movieId: this.movieId,
        startTime: `${
          parseInt(this.startTimeHour) < 10
            ? `0${this.startTimeHour}`
            : `${this.startTimeHour}`
        }:${
          parseInt(this.startTimeMinute) < 10
            ? `0${this.startTimeMinute}`
            : `${this.startTimeMinute}`
        }`,
        endTime: `${
          parseInt(this.endTimeHour) < 10
            ? `0${this.endTimeHour}`
            : `${this.endTimeHour}`
        }:${
          parseInt(this.endTimeMinute) < 10
            ? `0${this.endTimeMinute}`
            : `${this.endTimeMinute}`
        }`,
      };

      this.scheduleService
        .addSchedule(schedule)
        .subscribe((schedule) =>
          this.router.navigate([`/movies/${schedule.movieId}`])
        );
    }
  }
}
