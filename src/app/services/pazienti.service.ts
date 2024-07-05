import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Paziente } from '../interfaces/paziente.interface';

@Injectable({
  providedIn: 'root'
})
export class PazientiService {

  apiURL = environment.baseUrl + 'api/pazienti';

  constructor(private http: HttpClient) { }

  getAllPazienti(): Observable<Paziente[]> {
    return this.http.get<Paziente[]>(this.apiURL);
  }

  getPazienteById(id: number): Observable<Paziente> {
    return this.http.get<Paziente>(`${this.apiURL}/${id}`);
  }

  savePaziente(pazienteDTO: Paziente): Observable<Paziente> {
    return this.http.post<Paziente>(this.apiURL, pazienteDTO);
  }

  updatePaziente(id: number, pazienteDTO: Paziente): Observable<Paziente> {
    return this.http.put<Paziente>(`${this.apiURL}/${id}`, pazienteDTO);
  }

  deletePaziente(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiURL}/${id}`);
  }
}
