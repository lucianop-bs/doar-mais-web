import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface ConfirmDialogData {
  titulo: string;
  mensagem: string;
  confirmText?: string;
  cancelText?: string;
  perigo?: boolean;
}

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatButtonModule],
  template: `
    <h2 class="dialog-titulo" [class.perigo]="data.perigo">{{ data.titulo }}</h2>
    <p class="dialog-mensagem">{{ data.mensagem }}</p>
    <div class="dialog-acoes">
      <button mat-button (click)="ref.close(false)">
        {{ data.cancelText ?? 'Cancelar' }}
      </button>
      <button
        mat-raised-button
        [color]="data.perigo ? 'warn' : 'primary'"
        (click)="ref.close(true)"
      >
        {{ data.confirmText ?? 'Confirmar' }}
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 20px;
        min-width: 280px;
        max-width: 420px;
      }
      .dialog-titulo {
        margin: 0 0 12px 0;
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--brand-blue);
      }
      .dialog-titulo.perigo {
        color: var(--error);
      }
      .dialog-mensagem {
        margin: 0 0 20px 0;
        color: var(--text-secondary);
      }
      .dialog-acoes {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
      }
    `,
  ],
})
export class ConfirmDialogComponent {
  data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
  ref = inject(MatDialogRef<ConfirmDialogComponent>);
}
