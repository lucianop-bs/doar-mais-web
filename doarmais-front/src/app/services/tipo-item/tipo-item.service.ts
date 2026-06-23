import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../constants';
import { TipoItemResponse } from '../../models/tipo-item.model';

@Injectable({
  providedIn: 'root',
})
export class TipoItemService {
  private http = inject(HttpClient);
  private readonly URL = `${API_CONFIG.API_URL}/tipos-item`;

  listar(): Observable<TipoItemResponse[]> {
    return this.http.get<TipoItemResponse[]>(this.URL);
  }
}
