import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModificaPaziente } from 'src/app/interfaces/modifica-paziente.interface';
import { Paziente } from 'src/app/interfaces/paziente.interface';
import { PazientiService } from 'src/app/services/pazienti.service';

@Component({
  selector: 'app-modifica-paziente',
  templateUrl: './modifica-paziente.component.html',
  styleUrls: ['./modifica-paziente.component.scss']
})
export class ModificaPazienteComponent implements OnInit {

  pazienteSelezionato: Paziente | null = null;
  pazienteMod: ModificaPaziente | null = null;

  modificaMode = false;


  

  sessi = ['MASCHIO', 'FEMMINA'];

  constructor(private pazienteSrv: PazientiService) {}

  
  ngOnInit() {
    this.pazienteSrv.getPazienteSelezionato().subscribe(paziente => {
      this.pazienteSelezionato = paziente;
      if (paziente) {
        this.pazienteMod = {
          id: paziente.id,
          nome: paziente.anagrafica.nome,
          cognome: paziente.anagrafica.cognome,
          sesso: paziente.anagrafica.sesso,
          dataNascita: paziente.anagrafica.dataNascita,
          indirizzo: paziente.anagrafica.indirizzo,
          numeroTelefono: paziente.anagrafica.numeroTelefono,
          numeroTelefonoContatto: paziente.anagrafica.numeroTelefonoContatto,
          codiceFiscale: paziente.anagrafica.codiceFiscale,
        };
      }
    });
  }


  onSubmit(form: NgForm) {
    if (form.valid && this.pazienteMod) {
      console.log('Submitting the form with the following data:', this.pazienteMod);
      this.pazienteSrv.updatePaziente(this.pazienteMod.id, this.pazienteMod).subscribe(
        response => {
          console.log('Paziente aggiornato con successo:', response);
        },
        error => {
          console.error('Errore durante l\'aggiornamento del paziente:', error);
        }
      );
    } else {
      console.warn('Il form non è valido oppure il pazienteMod è undefined:', form, this.pazienteMod);
    }
  }
  
  resetModificaPaziente(): void {
    if (this.pazienteSelezionato) {
      this.pazienteMod = {
        id: this.pazienteSelezionato.id,
        nome: this.pazienteSelezionato.anagrafica.nome,
        cognome: this.pazienteSelezionato.anagrafica.cognome,
        sesso: this.pazienteSelezionato.anagrafica.sesso,
        dataNascita: this.pazienteSelezionato.anagrafica.dataNascita,
        indirizzo: this.pazienteSelezionato.anagrafica.indirizzo,
        numeroTelefono: this.pazienteSelezionato.anagrafica.numeroTelefono,
        numeroTelefonoContatto: this.pazienteSelezionato.anagrafica.numeroTelefonoContatto,
        codiceFiscale: this.pazienteSelezionato.anagrafica.codiceFiscale,
      };
    }
  }
}
