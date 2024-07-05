import { Component, OnInit } from '@angular/core';
import { Paziente } from 'src/app/interfaces/paziente.interface';
import { PazientiService } from 'src/app/services/pazienti.service';

@Component({
  selector: 'app-lista-pazienti',
  templateUrl: './lista-pazienti.component.html',
  styleUrls: ['./lista-pazienti.component.scss'],
})
export class ListaPazientiComponent implements OnInit {
  pazienti: Paziente[] = [];
  pazientiFiltrati: Paziente[] = [];
  termineRicerca: string = '';
  nessunPazienteTrovato: boolean = false;

  constructor(private pazientiSrv: PazientiService) {}

  ngOnInit(): void {
    this.caricaPazienti();
    console.log('OnInit - Dopo caricaPazienti:', this.pazienti);
  }

  caricaPazienti(): void {
    this.pazientiSrv.getAllPazienti().subscribe(
      (pazienti: Paziente[]) => {
        console.log('caricaPazienti - Pazienti ricevuti:', pazienti);
        this.pazienti = pazienti;
        console.log(
          'caricaPazienti - this.pazienti aggiornato:',
          this.pazienti
        );
        this.aggiornaListaPazientiFiltrati();
      },
      (error) => {
        console.error(
          'caricaPazienti - Errore durante il recupero dei pazienti:',
          error
        );
      }
    );
  }

  cercaPazienti(): void {
    if (this.termineRicerca.trim() !== '') {
      this.pazientiFiltrati = this.pazienti.filter(
        (paziente) =>
          paziente.anagrafica.nome
            .toLowerCase()
            .includes(this.termineRicerca.toLowerCase()) ||
          paziente.anagrafica.cognome
            .toLowerCase()
            .includes(this.termineRicerca.toLowerCase())
      );
    } else {
      this.aggiornaListaPazientiFiltrati();
    }
  }

  aggiornaListaPazientiFiltrati(): void {
    this.pazientiFiltrati = [...this.pazienti];
    this.verificaPazientiFiltrati();
  }

  verificaPazientiFiltrati(): void {
    this.nessunPazienteTrovato = this.pazientiFiltrati.length === 0;
  }
}
