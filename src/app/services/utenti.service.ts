import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { User } from '../interfaces/user.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UtentiService {

  private apiURL = environment.baseUrl + 'api/users';

  private userSub = new BehaviorSubject<User[]>([]);
  user$ = this.userSub.asObservable();

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Errore lato client:', error.error.message);
    } else {
      console.error(
        `Errore lato server: ${error.status}, ` +
        `messaggio: ${error.error.message}`
      );
    }
    return throwError('Qualcosa è andato storto. Riprova più tardi.');
  }

  private loadUsers(): void {
    this.http.get<User[]>(this.apiURL)
      .pipe(catchError(this.handleError))
      .subscribe(
        (users) => this.userSub.next(users),
        (error) => console.error('Errore durante il recupero degli utenti: ', error)
      );
  }

  fetchUsers(): void {
    this.loadUsers();
  }

  getAllUsers(): Observable<User[]> {
    return this.user$;
  }

}
