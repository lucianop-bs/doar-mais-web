import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_CONFIG } from '../../constants';
import {
  CadastraUsuarioResponse,
  CadastroRequest,
  LoginRequest,
  LoginResponse,
} from '../../models/auth.model';
import { UsuarioResponse } from '../../models/usuario.model';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  private readonly API_URL = API_CONFIG.API_URL;

  private usuarioSignal = signal<UsuarioResponse | null>(null);
  readonly usuario = this.usuarioSignal.asReadonly();
  readonly isLogged = computed(() => this.usuarioSignal() !== null);
  readonly isAdmin = computed(() => this.usuarioSignal()?.isAdmin ?? false);

  login(dados: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/auth/login`, dados, { withCredentials: true })
      .pipe(
        tap((res) => {
          this.storageService.setItem('user_name', res.nome);
          this.usuarioSignal.set({
            id: res.id,
            nome: res.nome,
            email: '',
            isAdmin: res.isAdmin,
            isBeneficiario: false,
          });
          this.carregarMe().subscribe();
        }),
      );
  }

  cadastrar(dados: CadastroRequest): Observable<CadastraUsuarioResponse> {
    return this.http.post<CadastraUsuarioResponse>(`${this.API_URL}/usuarios`, dados);
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${this.API_URL}/auth/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => this.limparSessao()),
        catchError(() => {
          this.limparSessao();
          return of(undefined);
        }),
      );
  }

  carregarMe(): Observable<UsuarioResponse | null> {
    return this.http.get<UsuarioResponse>(`${this.API_URL}/usuarios/me`).pipe(
      tap((u) => {
        this.usuarioSignal.set(u);
        this.storageService.setItem('user_name', u.nome);
      }),
      catchError(() => {
        this.limparSessao();
        return of(null);
      }),
    );
  }

  atualizarUsuarioLocal(u: UsuarioResponse) {
    this.usuarioSignal.set(u);
    this.storageService.setItem('user_name', u.nome);
  }

  temSessaoSalva(): boolean {
    return !!this.storageService.getItem('user_name');
  }

  private limparSessao() {
    this.storageService.removeItem('user_name');
    this.usuarioSignal.set(null);
  }
}
