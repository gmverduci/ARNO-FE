import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/interfaces/auth-data.interface';

@Component({
  selector: 'app-consegne',
  templateUrl: './consegne.component.html',
  styleUrls: ['./consegne.component.scss']
})
export class ConsegneComponent implements OnInit{

user!: AuthData | null;

  consegne = [
    {
    id: 0,
    titolo: 'Parametri vitali',
    contenuto: 'O2 nella norma',
    dataCreazione: '2024-07-07',
    paziente: 'Marcello Verduci',
    utente: 'antogar',
  },
  {
    id: 1,
    titolo: 'Paziente non si nutre',
    contenuto: 'Rifiutato il pranzo',
    dataCreazione: '2024-07-07',
    paziente: 'Franco Ranieri',
    utente: 'claver',
  },
  {
    id: 2,
    titolo: 'Ha dolore',
    contenuto: 'Dolore anca dx 7/10',
    dataCreazione: '2024-07-07',
    paziente: 'Franco Ranieri',
    utente: 'claver',
  },
  {
    id: 3,
    titolo: 'Punti riassorbiti',
    contenuto: 'Post chirurgia ok',
    dataCreazione: '2024-07-07',
    paziente: 'Marcello Verduci',
    utente: 'antogar',
  },
  {
    id: 4,
    titolo: 'Febbre',
    contenuto: 'Temperatura > 38.5',
    dataCreazione: '2024-07-08',
    paziente: 'Stefano Baldini',
    utente: 'antogar',
  },
  {
    id: 5,
    titolo: 'wTerapia conclusa',
    contenuto: 'Si può dimettere',
    dataCreazione: '2024-07-08',
    paziente: 'Marcello Verduci',
    utente: 'antogar',
  },
  {
    id: 6,
    titolo: 'Sofferenza renale',
    contenuto: 'Contattare nefrologia se peggiora',
    dataCreazione: '2024-07-08',
    paziente: 'Alessandro Franzoni',
    utente: 'claver',
  },
  {
    id: 7,
    titolo: 'ECG ok',
    contenuto: 'Stabilizzato ad oggi',
    dataCreazione: '2024-07-08',
    paziente: 'Stefano Baldini',
    utente: 'antogar',
  },
  {
    id: 8,
    titolo: 'Sospetta depressione',
    contenuto: 'Valutare consulto psichiatrico',
    dataCreazione: '2024-07-09',
    paziente: 'Marcello Verduci',
    utente: 'antogar',
  },
  {
    id: 9,
    titolo: 'Anosmia',
    contenuto: 'Verificare se persiste',
    dataCreazione: '2024-07-09',
    paziente: 'Alessandro Franzoni',
    utente: 'antogar',
  },
  ];

  constructor(private authSrv: AuthService){}



  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => this.user = user)
  }

}
