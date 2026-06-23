import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../constants';
import { UsuarioResponse, UsuarioUpdateRequest } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private readonly URL = `${API_CONFIG.API_URL}/usuarios`;

  listarTodos(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(this.URL);
  }

  me(): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.URL}/me`);
  }

  atualizar(id: number, dados: UsuarioUpdateRequest): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(`${this.URL}/${id}`, dados);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
