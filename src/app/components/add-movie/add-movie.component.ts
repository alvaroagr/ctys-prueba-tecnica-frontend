import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/Movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent implements OnInit {
  name: string;
  description: string;
  image: string;
  showError: boolean;

  constructor(
    private movieService: MovieService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.name || !this.description) {
      this.showError = true;
      return;
    }
    const movie: Movie = {
      name: this.name,
      description: this.description,
      image: this.image,
    };
    console.log(movie);

    this.movieService
      .addMovie(movie)
      .subscribe((movie) => this.router.navigate(['/movies']));
  }
}
