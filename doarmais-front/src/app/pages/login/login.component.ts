import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

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
        next: (res) => {
          console.log('Login realizado com sucesso!', res);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage.set('E-mail ou senha incorretos.');
        },
      });
    }
  }
}
