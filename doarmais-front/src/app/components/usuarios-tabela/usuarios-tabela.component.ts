import { Component, inject, input, output } from '@angular/core';
import { UsuarioResponse } from '../../models/usuario.model';
import { DialogService } from '../../services/dialog/dialog.service';
import { NotificacaoService } from '../../services/notificacao/notificacao.service';

@Component({
  selector: 'app-usuarios-tabela',
  imports: [],
  templateUrl: './usuarios-tabela.component.html',
  styleUrl: './usuarios-tabela.component.css',
})
export class UsuariosTabelaComponent {
  private dialogService = inject(DialogService);
  private notificacao = inject(NotificacaoService);

  usuarios = input<UsuarioResponse[]>([]);
  selecionadoId = input<number | null>(null);
  meuId = input<number | null>(null);

  selecionar = output<UsuarioResponse>();
  excluir = output<UsuarioResponse>();

  async confirmarExclusao(u: UsuarioResponse) {
    if (u.id === this.meuId()) {
      this.notificacao.info('Use a página "Minha Conta" para excluir o próprio usuário.');
      return;
    }
    const ok = await this.dialogService.confirmar({
      titulo: 'Excluir usuário',
      mensagem: `Esta ação é permanente. Excluir "${u.nome}"?`,
      confirmText: 'Excluir',
      perigo: true,
    });
    if (ok) this.excluir.emit(u);
  }
}
