import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../constants';
import { DoacaoRequest } from '../../models/doacao.model';

@Injectable({
  providedIn: 'root',
})
export class DoacaoService {
  private http = inject(HttpClient);

  cadastrarDoacao(dados: DoacaoRequest[]): Observable<void> {
    return this.http.post<void>(`${API_CONFIG.API_URL}/doacoes`, dados);
  }
}
