import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { NotificacaoService } from '../services/notificacao/notificacao.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificacao = inject(NotificacaoService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout().subscribe({
          complete: () => router.navigate(['/login']),
          error: () => router.navigate(['/login']),
        });
        return throwError(() => error);
      }

      if (error.status === 0) {
        notificacao.erro('Não foi possível conectar ao servidor. Verifique sua conexão.');
      } else if (error.status >= 500) {
        notificacao.erro('Erro interno no servidor. Tente novamente em instantes.');
      }

      console.error('HTTP Error:', error.status, error.message);

      return throwError(() => error);
    }),
  );
};
