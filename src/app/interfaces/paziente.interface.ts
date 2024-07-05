export interface Paziente {
  id: number;
  anagrafica: {
    nome: string;
    cognome: string;
    sesso: string;
    dataNascita: string;
    indirizzo: string;
    numeroTelefono: string;
    numeroTelefonoContatto: string;
    codiceFiscale: string;
    email: string;
  };
}
