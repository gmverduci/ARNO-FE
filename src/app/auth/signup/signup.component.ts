import { Component } from '@angular/core';
import { Signup } from 'src/app/interfaces/signup.interface';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})


export class SignUpComponent {
  ruoli = ['ADMIN', 'MEDICO', 'INFERMIERE', 'OSS'];

  userReg!: Signup;
  selectedRole: string = '';

  constructor(private authSrv: AuthService, private router: Router) {}

  ngAfterViewInit(): void {}

  onSubmit(form: NgForm) {
    form.value.role = this.selectedRole;
    console.log(form.value);
    this.authSrv.signup(form.value).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  selectRole(event: any) {
    const role = event.target.getAttribute('data-val');
    this.selectedRole = role;
  }
}
