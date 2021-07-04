import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private showMovieForm: boolean;
  private subject = new Subject<any>();

  constructor() { }

  toggleMovieForm(): void {
    this.showMovieForm = !this.showMovieForm;
    this.subject.next(this.showMovieForm)
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
