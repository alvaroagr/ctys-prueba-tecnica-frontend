import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private showErrorModal: boolean;
  private showMovieForm: boolean;
  private subject = new Subject<any>();
  private subjectModal = new Subject<any>();

  constructor() { }

  toggleErrorModal(): void {
    this.showErrorModal = !this.showErrorModal;
    this.subjectModal.next(this.showErrorModal)
  }

  toggleMovieForm(): void {
    this.showMovieForm = !this.showMovieForm;
    this.subject.next(this.showMovieForm)
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  onToggleModal(): Observable<any> {
    return this.subjectModal.asObservable();
  }
}
