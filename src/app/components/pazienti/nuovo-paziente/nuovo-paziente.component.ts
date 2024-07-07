import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NuovoPaziente } from 'src/app/interfaces/nuovo-paziente.interface';
import { PazientiService } from 'src/app/services/pazienti.service';

@Component({
  selector: 'app-nuovo-paziente',
  templateUrl: './nuovo-paziente.component.html',
  styleUrls: ['./nuovo-paziente.component.scss']
})
export class NuovoPazienteComponent {

  modificaMode = false;


  sessi = ['MASCHIO', 'FEMMINA'];
  nuovoPaziente: NuovoPaziente = {
    nome: '',
    cognome: '',
    sesso: '',
    dataNascita: '',
    indirizzo: '',
    numeroTelefono: '',
    numeroTelefonoContatto: '',
    codiceFiscale: '',
  };

  constructor(private pazienteSrv: PazientiService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(this.nuovoPaziente); // Controlla che i dati siano corretti qui
      this.pazienteSrv.savePaziente(this.nuovoPaziente).subscribe(
        (response) => {
          console.log('Paziente salvato:', response);
          form.resetForm();
          this.resetNuovoPaziente(); // Resetta il modello dopo il salvataggio
        },
        (error) => {
          console.error('Errore durante il salvataggio del paziente:', error);
        }
      );
    }
  }

  resetNuovoPaziente(): void {
    this.nuovoPaziente = {
      nome: '',
      cognome: '',
      sesso: '',
      dataNascita: '',
      indirizzo: '',
      numeroTelefono: '',
      numeroTelefonoContatto: '',
      codiceFiscale: '',
    };
  }

  
}
