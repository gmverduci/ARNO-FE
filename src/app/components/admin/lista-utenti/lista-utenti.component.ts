import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UtentiService } from 'src/app/services/utenti.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-lista-utenti',
  templateUrl: './lista-utenti.component.html',
  styleUrls: ['./lista-utenti.component.scss']
})
export class ListaUtentiComponent implements OnInit {

  users: User[] = [];
  filteredUsers: User[] = [];
  termineRicerca: string = '';
  nessunUtentetrovato: boolean = false;

  constructor(private utentiSrv: UtentiService) { }

  ngOnInit(): void {
    this.utentiSrv.fetchUsers();  
    this.utentiSrv.getAllUsers()
      .pipe(filter((users): users is User[] => Array.isArray(users)))
      .subscribe(
        (users: User[]) => {
          this.users = users;
          console.log(this.users)
          this.aggiornaListaUtentiFiltrati();
        },
        (error) => {
          console.error('Errore durante il recupero degli utenti:', error);
        }
      );
  }

  cercaUtenti(): void {
    if (this.termineRicerca.trim() !== '') {
      this.filteredUsers = this.users.filter(
        (user) =>
          user.anagrafica.nome.toLowerCase().includes(this.termineRicerca.toLowerCase()) ||
          user.anagrafica.cognome.toLowerCase().includes(this.termineRicerca.toLowerCase())
      );
    } else {
      this.aggiornaListaUtentiFiltrati();
    }
    this.verificaUtentiFiltrati();
  }

  aggiornaListaUtentiFiltrati(): void {
    this.filteredUsers = [...this.users];
    this.verificaUtentiFiltrati();
  }

  verificaUtentiFiltrati(): void {
    this.nessunUtentetrovato = this.filteredUsers.length === 0;
  }
}
