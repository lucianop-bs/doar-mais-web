import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { NotificacaoService } from '../../services/notificacao/notificacao.service';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-minha-conta',
  imports: [ReactiveFormsModule],
  templateUrl: './minha-conta.component.html',
  styleUrl: './minha-conta.component.css',
})
export class MinhaContaComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private usuarioService = inject(UsuarioService);
  private dialogService = inject(DialogService);
  private notificacao = inject(NotificacaoService);
  private router = inject(Router);

  usuario = this.authService.usuario;

  form: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit() {
    const u = this.usuario();
    if (u) {
      this.form.reset({ nome: u.nome, email: u.email });
    } else {
      this.authService.carregarMe().subscribe((u) => {
        if (u) this.form.reset({ nome: u.nome, email: u.email });
      });
    }
  }

  onSubmit() {
    const u = this.usuario();
    if (!u || !this.form.valid) return;

    this.usuarioService.atualizar(u.id, this.form.value).subscribe({
      next: (atualizado) => {
        this.authService.atualizarUsuarioLocal(atualizado);
        this.notificacao.sucesso('Dados atualizados com sucesso.');
      },
      error: (err) => {
        if (err.status === 0 || err.status >= 500) return;
        this.notificacao.erro(err?.error?.message ?? 'Erro ao atualizar conta.');
      },
    });
  }

  async excluirConta() {
    const u = this.usuario();
    if (!u) return;

    const ok = await this.dialogService.confirmar({
      titulo: 'Excluir conta',
      mensagem: `Esta ação é permanente. Sua conta "${u.nome}" e todos os acessos serão removidos.`,
      confirmText: 'Excluir minha conta',
      perigo: true,
    });
    if (!ok) return;

    this.usuarioService.excluir(u.id).subscribe({
      next: () => {
        this.notificacao.sucesso('Conta excluída.');
        this.authService.logout().subscribe({
          complete: () => this.router.navigate(['/home']),
          error: () => this.router.navigate(['/home']),
        });
      },
      error: (err) => {
        if (err.status === 0 || err.status >= 500) return;
        this.notificacao.erro(err?.error?.message ?? 'Erro ao excluir conta.');
      },
    });
  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }
}
