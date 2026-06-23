import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../constants';
import { DoacaoRequest, DoacaoResponse } from '../../models/doacao.model';

@Injectable({
  providedIn: 'root',
})
export class DoacaoService {
  private http = inject(HttpClient);
  private readonly URL = `${API_CONFIG.API_URL}/doacoes`;

  cadastrarDoacao(dados: DoacaoRequest[]): Observable<void> {
    return this.http.post<void>(this.URL, dados);
  }

  listar(): Observable<DoacaoResponse[]> {
    return this.http.get<DoacaoResponse[]>(this.URL);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
