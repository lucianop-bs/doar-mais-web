import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_CONFIG } from '../../constants';
import {
  CadastraUsuarioResponse,
  CadastroRequest,
  LoginRequest,
  LoginResponse,
} from '../../models/auth.model';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  private readonly API_URL = API_CONFIG.API_URL;
  private loggedInSignal = signal<boolean>(this.isLoggedIn());
  readonly isLogged = this.loggedInSignal.asReadonly();

  login(dados: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, dados).pipe(
      tap((res) => {
        if (res.token) {
          this.storageService.setItem('token', res.token);
          this.storageService.setItem('user_name', res.nome);
          this.loggedInSignal.set(true);
        }
      }),
    );
  }

  cadastrar(dados: CadastroRequest): Observable<CadastraUsuarioResponse> {
    return this.http.post<CadastraUsuarioResponse>(`${this.API_URL}/usuarios`, dados);
  }

  logout(): void {
    this.storageService.removeItem('token');
    this.storageService.removeItem('user_name');
    this.loggedInSignal.set(false);
  }

  isLoggedIn(): boolean {
    return !!this.storageService.getItem('token');
  }
}
