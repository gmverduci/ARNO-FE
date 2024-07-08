import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/interfaces/auth-data.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user!: AuthData |  null;


  constructor (private authSrv: AuthService, private router: Router){};

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {this.user = user})
  }


  logout(){
    this.authSrv.logout();
    this.router.navigate(['/']);
  }
}
