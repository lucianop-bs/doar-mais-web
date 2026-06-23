import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../constants';
import {
  DistribuicaoRequest,
  DistribuicaoResponse,
  EstoqueResponse,
  TotalCestasResponse,
} from '../../models/cesta.model';

@Injectable({
  providedIn: 'root',
})
export class CestaService {
  private http = inject(HttpClient);
  private readonly URL = `${API_CONFIG.API_URL}/cestas`;

  listarEstoque(): Observable<EstoqueResponse[]> {
    return this.http.get<EstoqueResponse[]>(`${this.URL}/estoque`);
  }

  total(): Observable<TotalCestasResponse> {
    return this.http.get<TotalCestasResponse>(`${this.URL}/total`);
  }

  distribuir(dados: DistribuicaoRequest): Observable<void> {
    return this.http.post<void>(`${this.URL}/distribuir`, dados);
  }

  listarDistribuicoes(): Observable<DistribuicaoResponse[]> {
    return this.http.get<DistribuicaoResponse[]>(`${this.URL}/distribuicoes`);
  }
}
