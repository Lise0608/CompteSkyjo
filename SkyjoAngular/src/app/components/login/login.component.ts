import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login: string = '';
  password = '';
  erreur = false;

  constructor(
    private router: Router,
    private authSrv: AuthentificationService
  ) {}

  check() {
    this.authSrv.authentication(this.login, this.password).subscribe({
      next: (compte) => {
        localStorage.setItem(
          'token',
          'Basic ' + window.btoa(this.login + ':' + this.password)
        );
        localStorage.setItem('compte', JSON.stringify(compte));
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        this.erreur = true;
      },
    });
  }
}
