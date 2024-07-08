import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Paziente } from '../interfaces/paziente.interface';
import { NuovoPaziente } from '../interfaces/nuovo-paziente.interface';
import { ModificaPaziente } from '../interfaces/modifica-paziente.interface';

@Injectable({
  providedIn: 'root',
})
export class PazientiService {
  private apiURL = environment.baseUrl + 'api/pazienti';

  private pazientiSub = new BehaviorSubject<Paziente[]>([]);
  pazienti$ = this.pazientiSub.asObservable();

  private pazienteSelezionatoSub = new BehaviorSubject<Paziente | null>(null);

  pazienteSelezionato$ = this.pazienteSelezionatoSub.asObservable();

  constructor(private http: HttpClient) {
    this.caricaPazienti();
  }

  setPazienteSelezionato(paziente: Paziente) {
    this.pazienteSelezionatoSub.next(paziente);
  }

  getPazienteSelezionato(): Observable<Paziente | null> {
    return this.pazienteSelezionatoSub.asObservable();
  }

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

  private caricaPazienti(): void {
    this.http
      .get<Paziente[]>(this.apiURL)
      .pipe(catchError(this.handleError))
      .subscribe(
        (pazienti) => this.pazientiSub.next(pazienti),
        (error) =>
          console.error('Errore durante il recupero dei pazienti:', error)
      );
  }

  getAllPazienti(): Observable<Paziente[]> {
    return this.http
      .get<Paziente[]>(this.apiURL)
      .pipe(catchError(this.handleError));
  }

  private updatePazientiSub() {
    this.getAllPazienti().subscribe(
      (pazienti: Paziente[]) => this.pazientiSub.next(pazienti),
      (error: any) =>
        console.error("Errore durante l'aggiornamento dei pazienti:", error)
    );
  }

  getPazienteById(id: number): Observable<Paziente> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Paziente>(url).pipe(catchError(this.handleError));
  }

  savePaziente(data: NuovoPaziente): Observable<string> {
    return this.http
      .post<string>(this.apiURL, data, { responseType: 'text' as 'json' })
      .pipe(catchError(this.handleError))
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.caricaPazienti();
        })
      );
  }

  updatePaziente(
    id: number,
    pazienteDTO: ModificaPaziente
  ): Observable<ModificaPaziente> {
    const url = `${this.apiURL}/${id}`;
    return this.http
      .put<ModificaPaziente>(url, pazienteDTO, {
        responseType: 'text' as 'json',
      })
      .pipe(
        catchError(this.handleError),
        tap(() => this.updatePazientiSub())
      );
  }

  deletePaziente(id: number): Observable<string> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<string>(url).pipe(
      catchError(this.handleError),
      tap(() => this.updatePazientiSub())
    );
  }
}
