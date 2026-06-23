import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { UsuariosTabelaComponent } from '../../components/usuarios-tabela/usuarios-tabela.component';
import { UsuarioFormComponent } from '../../components/usuario-form/usuario-form.component';
import { UsuarioResponse, UsuarioUpdateRequest } from '../../models/usuario.model';
import { AuthService } from '../../services/auth/auth.service';
import { NotificacaoService } from '../../services/notificacao/notificacao.service';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-usuarios',
  imports: [UsuariosTabelaComponent, UsuarioFormComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  private authService = inject(AuthService);
  private notificacao = inject(NotificacaoService);
  private router = inject(Router);

  usuarios = signal<UsuarioResponse[]>([]);
  selecionado = signal<UsuarioResponse | null>(null);

  meuId = this.authService.usuario()?.id ?? null;

  ngOnInit() {
    this.recarregar();
  }

  recarregar() {
    this.usuarioService.listarTodos().subscribe({
      next: (lista) => this.usuarios.set(lista),
      error: () => this.notificacao.erro('Erro ao carregar usuários.'),
    });
  }

  selecionar(u: UsuarioResponse) {
    this.selecionado.set(u);
  }

  cancelar() {
    this.selecionado.set(null);
  }

  salvar(dados: UsuarioUpdateRequest) {
    const u = this.selecionado();
    if (!u) return;
    this.usuarioService.atualizar(u.id, dados).subscribe({
      next: () => {
        this.notificacao.sucesso('Usuário atualizado.');
        this.selecionado.set(null);
        this.recarregar();
      },
      error: (err) =>
        this.notificacao.erro(err?.error?.message ?? 'Erro ao atualizar usuário.'),
    });
  }

  excluir(u: UsuarioResponse) {
    this.usuarioService.excluir(u.id).subscribe({
      next: () => {
        this.notificacao.sucesso(`Usuário "${u.nome}" excluído.`);
        if (this.selecionado()?.id === u.id) this.selecionado.set(null);
        this.recarregar();
      },
      error: (err) => this.notificacao.erro(err?.error?.message ?? 'Erro ao excluir usuário.'),
    });
  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }
}
