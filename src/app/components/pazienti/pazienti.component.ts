import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/interfaces/auth-data.interface';
import { Paziente } from 'src/app/interfaces/paziente.interface';
import { PazientiService } from 'src/app/services/pazienti.service';

@Component({
  selector: 'app-pazienti',
  templateUrl: './pazienti.component.html',
  styleUrls: ['./pazienti.component.scss'],
})
export class PazientiComponent implements OnInit {
  pazienteSelezionato: Paziente | null = null;
  user!: AuthData | null;

  constructor(
    private pazientiSrv: PazientiService,
    private authSrv: AuthService
  ) {}

  ngOnInit() {
    this.pazientiSrv.getPazienteSelezionato().subscribe((paziente) => {
      this.pazienteSelezionato = paziente;
    });
    this.getUserAuth();
  }

  getUserAuth(){
    this.authSrv.user$.subscribe((user) => this.user = user);
    console.log(this.user)
    }

}
