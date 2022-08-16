import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"

@Injectable({
    providedIn: 'root'
})
export class AgendaService {
    public url = 'https://62fc040cabd610251c14f314.mockapi.io';

    constructor(
        private http: HttpClient
    ) { }

    getAvailableSlots() {
        return this.http.get<any[]>(`${this.url}/available-slots`);
    }

}
