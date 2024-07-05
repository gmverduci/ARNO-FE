import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authSrv: AuthService, private router: Router) {}

  login(form: NgForm) {
    this.authSrv.login(form.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
        window.scrollTo(0, 0);
      },
      error: (error) => {
        console.error(error);
        return;
      },
    });
  }
}
