export interface User {
    id: number,
    ruolo: string,
    email: string,
    username: string, 
    password: string,
    statoUtente: string,
    darkMode: boolean,
    anagrafica: {
        nome: string,
        cognome: string,
        sesso: string,
        indirizzo: string,
        numeroTelefono: string
    }
}
