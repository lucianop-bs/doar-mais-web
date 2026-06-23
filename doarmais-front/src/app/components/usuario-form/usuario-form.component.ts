import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioResponse, UsuarioUpdateRequest } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario-form',
  imports: [ReactiveFormsModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css',
})
export class UsuarioFormComponent {
  private fb = inject(FormBuilder);

  usuario = input<UsuarioResponse | null>(null);
  podeEditarAdmin = input<boolean>(true);

  salvar = output<UsuarioUpdateRequest>();
  cancelar = output<void>();

  form: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    isAdmin: [false],
  });

  constructor() {
    effect(() => {
      const u = this.usuario();
      if (u) {
        this.form.reset({ nome: u.nome, email: u.email, isAdmin: u.isAdmin });
      } else {
        this.form.reset({ nome: '', email: '', isAdmin: false });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.salvar.emit(this.form.value as UsuarioUpdateRequest);
    }
  }
}
