import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NotificacaoService } from '../../services/notificacao/notificacao.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private notificacao = inject(NotificacaoService);

  errorMessage = signal<string | null>(null);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    this.errorMessage.set(null);
    if (this.loginForm.valid) {
      const dadosLogin = this.loginForm.value;
      this.authService.login(dadosLogin).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          if (err.status === 0 || err.status >= 500) {
            return;
          }
          const msg = err?.error?.message ?? 'E-mail ou senha incorretos.';
          this.errorMessage.set(msg);
          this.notificacao.erro(msg);
        },
      });
    }
  }
}
