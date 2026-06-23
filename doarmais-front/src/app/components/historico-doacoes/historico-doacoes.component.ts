import { Component, inject, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DoacaoResponse } from '../../models/doacao.model';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
  selector: 'app-historico-doacoes',
  imports: [DatePipe],
  templateUrl: './historico-doacoes.component.html',
  styleUrl: './historico-doacoes.component.css',
})
export class HistoricoDoacoesComponent {
  private dialogService = inject(DialogService);

  doacoes = input<DoacaoResponse[]>([]);
  isAdmin = input<boolean>(false);

  remover = output<number>();

  async confirmarRemocao(d: DoacaoResponse) {
    const ok = await this.dialogService.confirmar({
      titulo: 'Remover doação',
      mensagem: `Deseja remover a doação de ${d.quantidade}x ${d.item} feita por ${d.doador}?`,
      confirmText: 'Remover',
      perigo: true,
    });
    if (ok) this.remover.emit(d.id);
  }
}
