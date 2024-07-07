import { Component, OnInit } from '@angular/core';
import { Paziente } from 'src/app/interfaces/paziente.interface';
import { PazientiService } from 'src/app/services/pazienti.service';

@Component({
  selector: 'app-pazienti',
  templateUrl: './pazienti.component.html',
  styleUrls: ['./pazienti.component.scss']
})
export class PazientiComponent implements OnInit{

  pazienteSelezionato: Paziente | null = null;

  constructor(private pazientiSrv: PazientiService) {}

  ngOnInit() {
    this.pazientiSrv.getPazienteSelezionato().subscribe(paziente => {
      this.pazienteSelezionato = paziente;
    });
  }

}
