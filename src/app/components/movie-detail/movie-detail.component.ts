import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/Movie';
import { Schedule } from 'src/app/Schedule';

import { MovieService } from 'src/app/services/movie.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie: Movie = {name: '', description: '', image: '', id: -1};
  schedules: Schedule[];

  constructor(
    private movieService: MovieService,
    private scheduleService: ScheduleService,
    private route: ActivatedRoute,
    private tokenSvc: TokenStorageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id
    this.movieService.getMovie(id).subscribe(
      (payload) => {
        this.movie = payload.movie;
        this.schedules = payload.schedules;
      }
    )
    this.scheduleService.getSchedulesByMovie(id).subscribe(
      (schedules) => this.schedules = schedules.sort((a,b) => (a.startTime > b.startTime) ? -1 : 1).sort((a,b) => (a.roomId > b.roomId) ? 1 : -1)
    )
  }

  formatDate(date: any) {
    const d = new Date(date)
    return d.toTimeString().split(' ')[0]
  }

  saveSchedule(schedule: Schedule) {
    const userId = this.tokenSvc.getUser().id;
    const payload = {
      userId,
      scheduleId: schedule.id
    }
    console.log(payload)
  }
}
