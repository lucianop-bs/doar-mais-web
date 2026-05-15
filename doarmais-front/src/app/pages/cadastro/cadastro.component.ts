import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  errorMessage = signal<string | null>(null);
  sucessoMessage = signal<string | null>(null);

  cadastroForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.cadastroForm.valid) {
      const dados = this.cadastroForm.value;
      this.authService.cadastrar(dados).subscribe({
        next: (res) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage.set(err.error.message);
        },
      });
    }
  }
}
