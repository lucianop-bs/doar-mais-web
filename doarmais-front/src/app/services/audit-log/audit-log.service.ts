import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../constants';
import { AuditLogResponse } from '../../models/audit-log.model';

@Injectable({
  providedIn: 'root',
})
export class AuditLogService {
  private http = inject(HttpClient);
  private readonly URL = `${API_CONFIG.API_URL}/audit-logs`;

  listar(): Observable<AuditLogResponse[]> {
    return this.http.get<AuditLogResponse[]>(this.URL);
  }
}
