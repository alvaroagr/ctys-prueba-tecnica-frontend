import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Schedule } from '../Schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = 'http://localhost:8080/api/schedules'
  private movieUrl = 'http://localhost:8080/api/movies'

  constructor(private http:HttpClient) { }

  getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.apiUrl);
  }

  getSchedulesByMovie(movieId: number): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.movieUrl}/${movieId}/schedules`);
  }

  addSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.apiUrl, schedule);
  }
}
