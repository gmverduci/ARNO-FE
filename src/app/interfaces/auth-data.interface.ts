export interface AuthData {
    token: string,
    user : {
        id: number,
        username: string,
        nome: string,
        cognome: string,
        email: string,
        sesso: string,
        indirizzo: string,
        numeroTelefono: string,
        codiceFiscale: string,
        ruolo: string,
        authorities: [
            {
            authority: string;
        }
    ],
    credentialsNonExpired: true;
    accountNonExpired: true;
    accountNonLocked: true;            
    }
}
