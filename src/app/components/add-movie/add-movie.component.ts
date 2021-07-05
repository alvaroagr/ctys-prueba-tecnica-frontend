import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/Movie';
import { Router } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent implements OnInit {
  subscription: Subscription;

  name: string;
  description: string;
  image: string;
  showErrorModal: boolean;
  errors: string[] = []

  constructor(
    private movieService: MovieService,
    private router: Router,
    private uiService: UiService

  ) {
    this.subscription = this.uiService
      .onToggleModal()
      .subscribe((value) => (this.showErrorModal = value));
  }

  ngOnInit(): void {}

  toggleErrorModal(): void {
    this.uiService.toggleErrorModal();
  }

  onSubmit(): void {
    this.errors = []
    if(!this.name) this.errors.push("Debes incluir el nombre de la película")
    if(!this.description) this.errors.push("Debes incluir una descripcion para la película")
    if(!this.image) this.errors.push("Debes incluir una imagen de la película")
    if(this.errors.length > 0) {
      this.uiService.toggleErrorModal();
      return;
    }

    const movie: Movie = {
      name: this.name,
      description: this.description,
      image: this.image,
    };

    this.movieService
      .addMovie(movie)
      .subscribe((movie) => this.router.navigate(['/movies']));
  }

}
