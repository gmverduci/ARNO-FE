import { Component, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Paziente } from 'src/app/interfaces/paziente.interface';
import { PazientiService } from 'src/app/services/pazienti.service';
import { filter } from 'rxjs/operators';
import { ModificaPazienteComponent } from '../modifica-paziente/modifica-paziente.component';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/interfaces/user.interface';
import { AuthData } from 'src/app/interfaces/auth-data.interface';

@Component({
  selector: 'app-lista-pazienti',
  templateUrl: './lista-pazienti.component.html',
  styleUrls: ['./lista-pazienti.component.scss'],
})
export class ListaPazientiComponent implements AfterViewInit {




  pazienti: Paziente[] = [];
  pazientiFiltrati: Paziente[] = [];
  termineRicerca: string = '';
  nessunPazienteTrovato: boolean = false;
  user!: AuthData | null;

  constructor(private pazientiSrv: PazientiService, private authSrv: AuthService) {}

  ngOnInit(): void {
    this.pazientiSrv.pazienti$
      .pipe(filter((pazienti): pazienti is Paziente[] => pazienti !== null))
      .subscribe(
        (pazienti: Paziente[]) => {
          this.pazienti = pazienti;
          this.aggiornaListaPazientiFiltrati();
        },
        (error) => {
          console.error('Errore durante il recupero dei pazienti:', error);
        }
      );
      this.getUserAuth();
  }

  ngAfterViewInit(): void {

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
    this.verificaPazientiFiltrati();
  }

  aggiornaListaPazientiFiltrati(): void {
    this.pazientiFiltrati = [...this.pazienti];
    this.verificaPazientiFiltrati();
  }

  verificaPazientiFiltrati(): void {
    this.nessunPazienteTrovato = this.pazientiFiltrati.length === 0;
  }

  scrollToNuovoPaziente(): void {
    const element = document.getElementById('nuovoPaziente');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToModificaPaziente(): void {
    const element = document.getElementById('modificaPaziente');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

 
  selezionaPaziente(paziente: Paziente) {
    console.log(paziente);
    this.pazientiSrv.setPazienteSelezionato(paziente);
this.scrollToModificaPaziente();  }
 
getUserAuth(){
this.authSrv.user$.subscribe((user) => this.user = user);
console.log(this.user)
}
  
}
