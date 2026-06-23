import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificacaoService {
  private snackBar = inject(MatSnackBar);

  sucesso(msg: string) {
    this.snackBar.open(msg, 'OK', {
      duration: 3000,
      panelClass: ['snack-sucesso'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  erro(msg: string) {
    this.snackBar.open(msg, 'Fechar', {
      duration: 5000,
      panelClass: ['snack-erro'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  info(msg: string) {
    this.snackBar.open(msg, 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
